// @ts-ignore
const { createMollieClient } = require("@mollie/api-client");
// @ts-ignore
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
// @ts-ignore
const mime = require("mime-types");
// @ts-ignore
const _ = require("lodash");
// @ts-ignore
const { v4: uuidv4 } = require("uuid");
const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY,
});

module.exports = {
  async payment(ctx) {
    // @ts-ignore
    const { cartItems, discount, couponCode, phone, email, location } =
      ctx.request.body;

    try {
      // Get product data from database
      const productIds = cartItems.filter(item => item.item_type.startsWith("product_")).map(item => item.id);
      const ticketIds = cartItems.filter(item => item.item_type.startsWith("ticket_")).map(item => item.id);
      const products = await strapi.db
        .query("api::shop-item.shop-item")
        .findMany({
          filters: { id: { $in: productIds } },
        });

        const tickets = await strapi.db
        .query("api::ticket.ticket")
        .findMany({
          filters: { id: { $in: ticketIds } },
        });

      // Calculate subtotal based on cart items and product prices
      let subtotal = 0;
      cartItems.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        const ticket = tickets.find((t) => t.id === item.id);
        if (product) {
          const price = parseFloat(product.Price);
          const quantity = item.quantity;
          if (!isNaN(price) && !isNaN(quantity)) {
            subtotal += price * quantity;
          }
        }
        if (ticket) {
          const price = parseFloat(ticket.Price);
          const quantity = item.quantity;
          if (!isNaN(price) && !isNaN(quantity)) {
            subtotal += price * quantity;
          }
        }
      });

      // Apply discount if provided
      let discount_ = 0;
      let coupon = { code: 0 };

      if (discount && coupon) {
        discount_ = parseFloat(discount);
        coupon = await strapi.db.query("api::coupon.coupon").findOne({
          where: { code: couponCode },
        });
        if (coupon.max_usag <= 0) {
          coupon = { code: 0 };
        }
      }
      if (discount_ > subtotal) {
        discount_ = subtotal; // Discount can't be greater than the subtotal
      }

      const totalAmount = subtotal - discount_;

      // Create Mollie payment
      const payment = await mollieClient.payments.create({
        amount: {
          currency: "EUR",
          value: totalAmount.toFixed(2), // Round to two decimal places
        },
        description: "Order description here",
        redirectUrl: `${process.env.CLIENT_URL}/home?show=true&title=Thank you for your payment&message=Payment has been done successfully we had sent an invoice to your email `,
        webhookUrl: `${process.env.API_URL}/api/payment/validate`,
        method: ["ideal", "creditcard", "paypal", "applepay"],
      });

      const data = {
        orderId: payment.id,
        cart: cartItems,
        subtotal: subtotal,
        amount: totalAmount,
        email: email,
        address: location,
        phone: phone,
        coupon: coupon.code,
        discount: discount_,
      };

      // Generate the invoice PDF buffer
      const invoiceBuffer = await generatePdfBuffer(data);

      // Create a temporary file path for saving the invoice PDF
      const fileName = `invoice_${payment.id}.pdf`;
      const tempFilePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        fileName
      );

      // Save the invoice PDF to the filesystem
      fs.writeFileSync(tempFilePath, invoiceBuffer);

      // Get file stats (size, type, etc.)
      const stats = fs.statSync(tempFilePath);
      const mimeType = mime.lookup(tempFilePath); // Detect MIME type

      // Upload the file using Strapi's upload service (e.g., Cloudinary)
      const uploadedFile = await strapi.plugins.upload.services.upload.upload({
        data: {},
        files: {
          path: tempFilePath, // Path to the file
          name: fileName, // File name
          type: mimeType || "application/pdf", // MIME type (should be 'application/pdf')
          size: stats.size, // Size of the file
          resource_type: "raw",
        },
      });

      // Save payment data with the uploaded PDF file ID
      await strapi.entityService.create("api::payment.payment", {
        data: {
          mollieId: payment.id,
          amount: totalAmount,
          status: "pending",
          shop_items: cartItems.map((item) => ({ id: item.id })), // Save cart item IDs
          invoice: uploadedFile[0].id, // Save the uploaded file ID
          email: email,
          phone: phone,
          address: location,
        },
      });

      // Respond with the payment URL and invoice URL
      ctx.send({
        paymentUrl: payment.links.checkout.href,
        invoiceUrl: uploadedFile[0].url, // Send the invoice URL back to the frontend
      });

      // Optionally, remove the temporary file after uploading
      fs.unlinkSync(tempFilePath);
    } catch (error) {
      console.error(error);
      ctx.throw(400, `Payment creation failed: ${error.message}`);
    }
  },

  // Webhook handler for Mollie payment status updates
  // Webhook handler for Mollie payment status updates
  async handlePaymentWebhook(ctx) {
    const { id, status } = ctx.request.body; // Get payment status and ID from Mollie webhook payload
    console.log(ctx.request.body);
    console.log("hello there ");
    // Check if 'id' is provided in the request
    if (id) {
      try {
        // Get the payment details from Mollie
        const payment = await mollieClient.payments.get(id);

        // Find the payment record in Strapi by mollieId
        const paymentRecord = await strapi.db
          .query("api::payment.payment")
          .findOne({
            where: { mollieId: id }, // Search for the payment record using the mollieId
            populate: { invoice: true },
          });

        // Check if payment record was found in the database
        if (paymentRecord) {
          // Update the payment status in the Strapi database
          await strapi.entityService.update(
            "api::payment.payment", // The content type
            paymentRecord.id, // The payment record ID
            {
              data: {
                status: payment.status, // Update the status field based on Mollie's status
              },
            }
          );
          if (payment.status === "paid") {
            try {
              await strapi.plugins["email"].services.email.send({
                to: paymentRecord.email, // You can pass this from the frontend
                from: process.env.EMAIL,
                subject: "Invoice",
                text: `Thank you for buying from de gastuin your invoice in the link below !`,
                html: `<p>Thank you for buying from de gastuin your invoice in the link below ! </p><br> <a href=${paymentRecord.invoice.url} >Your Invoice link </a>`,
              });
              ctx.send({ message: "Email sent successfully!" });
            } catch (err) {
              ctx.send({ message: "Failed to send email", error: err });
            }
          }
          // Respond to indicate the payment status was successfully updated
          ctx.send({ message: `Payment status updated to ${payment.status}` });
        } else {
          // Respond if no payment record was found for the provided mollieId
          ctx.send({ message: `Payment record with mollieId ${id} not found` });
        }
      } catch (error) {
        // Handle any errors that occur while processing the payment
        console.error("Error processing payment webhook:", error);
        ctx.send({
          message: "An error occurred while processing the payment status",
        });
      }
    } else {
      // Respond if no 'id' was provided in the webhook payload
      ctx.send({ message: "No payment ID provided in the webhook payload" });
    }
  },
};

function generatePdfBuffer(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      // Set up the stream to collect the PDF in memory
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        // Concatenate all parts into one buffer
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer); // Return the buffer directly
      });

      // Title of the document
      doc.fontSize(18).text("Invoice for Payment", { align: "center" });
      doc.moveDown();

      // Add order details (e.g., order ID, date)
      doc.fontSize(12).text(`Order ID: ${data.orderId}`, { align: "left" });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });
      doc.moveDown();

      // Add cart items to the invoice
      doc.fontSize(14).text("Cart Items:", { align: "left" });
      doc.moveDown();
      data.cart.forEach((item, index) => {
        // Validate and calculate item price
        const price = parseFloat(item.price);
        const quantity = parseFloat(item.quantity);
        if (isNaN(price)) {
          console.error(`Invalid price for item at index ${index}:`, item);
          doc.text(`Error: Invalid price for ${item.name}`, {
            align: "left",
            color: "red",
          });
        } else {
          const totalItemPrice = (price * quantity).toFixed(2);
          doc.text(`${item.name} x ${item.quantity} = ${totalItemPrice} EUR`, {
            align: "left",
          });
          doc.moveDown();
        }
      });
      doc.moveDown();

      doc.text(`Customer Email : ${data.email} `, {
        align: "left",
      });
      doc.moveDown();

      doc.text(`Customer Phone : ${data.phone} `, {
        align: "left",
      });
      doc.moveDown();

      doc.text(`Delivery Address : ${data.address} `, {
        align: "left",
      });
      doc.moveDown();
      if (data.coupon !== 0) {
        doc.text(`Coupon Applied code : ${data.coupon} `, {
          align: "left",
        });
      }
      doc.moveDown();

      // Add subtotal and total amount
      doc
        .fontSize(14)
        .text(`Subtotal: ${data.subtotal.toFixed(2)} EUR`, { align: "right" });

      if (data.discount) {
        doc.text(`Discount: ${data.discount.toFixed(2)} EUR`, {
          align: "right",
        });
      }

      doc.text(`Total: ${data.amount.toFixed(2)} EUR`, { align: "right" });

      // Finalize the document
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
