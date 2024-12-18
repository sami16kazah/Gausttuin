// @ts-ignore
const { createMollieClient } = require("@mollie/api-client");
// @ts-ignore
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
// @ts-ignore
const mime = require("mime-types");
// @ts-ignore
const { v4: uuidv4 } = require("uuid");
const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY,
});

module.exports = {
  async payment(ctx) {
    // @ts-ignore
    const { cartItems, couponCode, phone, email, location } = ctx.request.body;
    // Calculate subtotal from cart items
    let subtotal = 0;
    try {
      // Get product and ticket data
      const productIds = cartItems
        .filter((item) => item.item_type.startsWith("product_"))
        .map((item) => item.id);
      const ticketIds = cartItems
        .filter((item) => item.item_type.startsWith("ticket_"))
        .map((item) => item.id);
      if (productIds) {
        const products = await strapi.db
          .query("api::shop-item.shop-item")
          .findMany({
            filters: { id: { $in: productIds } },
          });
        cartItems.forEach((item) => {
          const product = products.find(
            (p) => p.id === item.id && item.item_type === "product_"
          );
          if (product) {
            const price = parseFloat(product.Price);
            const quantity = item.quantity;
            if (!isNaN(price) && !isNaN(quantity)) {
              subtotal += price * quantity;
            }
          }
        });
      }
      if (ticketIds) {
        const tickets = await strapi.db.query("api::ticket.ticket").findMany({
          filters: { id: { $in: ticketIds } },
        });
        cartItems.forEach((item) => {
          const ticket = tickets.find(
            (t) => t.id === item.id && item.item_type === "ticket_"
          );
          if (ticket) {
            const price = parseFloat(ticket.price);
            const quantity = item.quantity;
            if (!isNaN(price) && !isNaN(quantity)) {
              subtotal += price * quantity;
            }
          }
        });
      }

      // Apply coupon discount if valid coupon code is provided
      let discount_ = 0;
      let coupon = { code: 0 };

      // If a coupon code is provided, validate it
      if (couponCode) {
        try {
          coupon = await strapi.db.query("api::coupon.coupon").findOne({
            where: { code: couponCode },
          });
        } catch (error) {
          coupon = { code: 0 };
        }

        if (coupon && coupon.max_usag <= 0) {
          coupon = { code: 0 }; // Invalidate coupon if usage limit is exceeded
        }

        // If a valid coupon is found, apply the discount
        if (coupon.code) {
          discount_ = coupon.discount_value; // Coupon discount value (could be a percentage or fixed amount)
        }
      }

      // Ensure discount doesn't exceed the subtotal
      if (discount_ > subtotal) {
        discount_ = subtotal; // Discount can't be greater than the subtotal
      }

      const totalAmount = subtotal - discount_; // Calculate total after applying discount

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
          shop_items: productIds.map((id) => ({ id: id })), // Save cart item IDs
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
  async handlePaymentWebhook(ctx) {
    const { id, status } = ctx.request.body;
    console.log(ctx.request.body);

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

        if (paymentRecord) {
          // Update the payment status in the Strapi database
          await strapi.entityService.update(
            "api::payment.payment",
            paymentRecord.id,
            {
              data: {
                status: payment.status,
              },
            }
          );

          if (payment.status === "paid") {
            try {
              // Send email with the invoice
              await strapi.plugins["email"].services.email.send({
                to: paymentRecord.email,
                from: process.env.EMAIL,
                subject: "Invoice",
                text: `Thank you for your purchase! Your invoice is available below.`,
                html: `<p>Thank you for your purchase! Your invoice is available below:</p><a href=${paymentRecord.invoice.url}>Download Invoice</a>`,
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

// PDF Generation
function generatePdfBuffer(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer); // Return the buffer directly
      });

      // Title of the document
      doc.fontSize(18).text("Invoice for Payment", { align: "center" });
      doc.moveDown();

      // Order details
      doc.fontSize(12).text(`Order ID: ${data.orderId}`, { align: "left" });
      doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "left" });
      doc.moveDown();

      // Add cart items
      doc.fontSize(14).text("Cart Items:", { align: "left" });
      doc.moveDown();
      data.cart.forEach((item, index) => {
        const price = parseFloat(item.price);
        const quantity = parseFloat(item.quantity);
        if (isNaN(price)) {
          console.error(`Invalid price for item at index ${index}:`, item);
          doc.text(`Error: Invalid price for ${item.name}`, { align: "left" });
        } else {
          const totalItemPrice = (price * quantity).toFixed(2);
          doc.text(`${item.name} x ${item.quantity} = ${totalItemPrice} EUR`, {
            align: "left",
          });
          doc.moveDown();
        }
      });
      doc.moveDown();

      // Customer Details
      doc.text(`Customer Email: ${data.email}`, { align: "left" });
      doc.text(`Customer Phone: ${data.phone}`, { align: "left" });
      doc.text(`Delivery Address: ${data.address}`, { align: "left" });
      doc.moveDown();

      if (data.coupon !== 0) {
        doc.text(`Coupon Applied Code: ${data.coupon}`, { align: "left" });
      }
      doc.moveDown();

      // Add subtotal and total amount
      doc
        .fontSize(14)
        .text(`Subtotal: ${data.subtotal.toFixed(2)} EUR`, { align: "right" });
      if (data.discount > 0) {
        doc.text(`Discount: ${data.discount.toFixed(2)} EUR`, {
          align: "right",
        });
      }
      doc.text(`Total: ${data.amount.toFixed(2)} EUR`, { align: "right" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
