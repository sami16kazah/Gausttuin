const { createMollieClient } = require("@mollie/api-client");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async payment(ctx) {
    const { cartItems, discount, couponCode } = ctx.request.body;
    const mollieClient = createMollieClient({
      apiKey: "test_buU5ktQBSEgVK2v49n6KhWTArnwyFh",
    });

    try {
      // Get product data from database
      const productIds = cartItems.map((item) => item.id);
      const products = await strapi.db.query("api::shop-item.shop-item").findMany({
        filters: { id: { $in: productIds } },
      });

      // Calculate subtotal based on cart items and product prices
      let subtotal = 0;
      cartItems.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
          const price = parseFloat(product.Price);
          const quantity = item.quantity;
          if (!isNaN(price) && !isNaN(quantity)) {
            subtotal += price * quantity;
          }
        }
      });

      // Apply discount if provided
      let discount_ = 0;
      if (discount) {
        discount_ = parseFloat(discount);
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
        redirectUrl: `${process.env.CLIENT_URL}/home?show=true&title=Thank you for your payment&message=Payment has been done successfully`,
        method: ["ideal", "creditcard", "paypal", "applepay"],
      });

      const data = {
        orderId: payment.id,
        cart: cartItems,
        amount: totalAmount,
        discount: discount_,
      };

      // Generate the invoice PDF buffer
      const invoiceBuffer = await generatePdfBuffer(data);

      // Create a temporary file path for saving the invoice PDF
      const fileName = `invoice_${payment.id}.pdf`;
      const tempFilePath = path.join(process.cwd(), "public", "uploads", fileName);

      // Save the invoice PDF to the filesystem
      fs.writeFileSync(tempFilePath, invoiceBuffer);

      // Get file stats (size, type, etc.)
      const stats = fs.statSync(tempFilePath);
      const mimeType = mime.lookup(tempFilePath); // Detect MIME type

      // Upload the file using Strapi's upload service (e.g., Cloudinary)
      const uploadedFile = await strapi.plugins.upload.services.upload.upload({
        data: {},
        files: {
          path: tempFilePath,    // Path to the file
          name: fileName,        // File name
          type: mimeType,        // MIME type (should be 'application/pdf')
          size: stats.size,      // Size of the file
          resource_type: 'raw',
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
    const { id, status } = ctx.request.body; // Get payment status and ID from Mollie webhook payload

    if (status === "paid") {
      // Payment is successful, update the payment status in the database
      await strapi.entityService.update("api::payment.payment", id, {
        data: {
          status: "fulfilled", // Update payment status to "fulfilled"
        },
      });

      // Respond with a success message
      ctx.send({ message: "Payment status updated to fulfilled" });
    } else {
      // Handle other statuses (e.g., failed, pending, etc.)
      ctx.send({ message: `Payment status is not fulfilled: ${status}` });
    }
  },
};

// Function to generate the PDF buffer in memory
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
      data.cart.forEach((item) => {
        const totalItemPrice = (parseFloat(item.price) * item.quantity).toFixed(2); // Price * Quantity
        doc.text(`${item.name} x ${item.quantity} = ${totalItemPrice} EUR`, { align: "left" });
      });
      doc.moveDown();

      // Add subtotal and total amount
      doc.fontSize(14).text(`Subtotal: ${data.amount.toFixed(2)} EUR`, { align: "right" });

      if (data.discount) {
        doc.text(`Discount: ${data.discount.toFixed(2)} EUR`, { align: "right" });
      }

      doc.text(`Total: ${data.amount.toFixed(2)} EUR`, { align: "right" });

      // Finalize the document
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
