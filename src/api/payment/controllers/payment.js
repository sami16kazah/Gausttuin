const { createMollieClient } = require("@mollie/api-client");

module.exports = {
  async payment(ctx) {
    const { cartItems, discount, couponCode } = ctx.request.body;
    const mollieClient = createMollieClient({
      apiKey: "test_buU5ktQBSEgVK2v49n6KhWTArnwyFh",
    });

    try {
      const productIds = cartItems.map((item) => item.id);
      console.log("Product IDs:", productIds);

      // Fetch products from the database
      const products = await strapi.db
        .query("api::shop-item.shop-item")
        .findMany({
          filters: { id: { $in: productIds } },
        });

      // Calculate subtotal based on the database prices
      let subtotal = 0;
      cartItems.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
          const price = parseFloat(product.Price); // Ensure correct field name (Price with uppercase 'P')
          const quantity = item.quantity;

          // Check if price and quantity are valid numbers
          if (!isNaN(price) && !isNaN(quantity)) {
            subtotal += price * quantity;
          } else {
            console.error(`Invalid price or quantity for product ${item.id}`);
          }
        }
      });

      console.log("Subtotal after calculation:", subtotal);

      // Apply discount if coupon code is valid (discount as a fixed amount of money)
      let discount_ = 0;
      if (discount) {
        discount_ = parseFloat(discount); // The discount is a fixed amount, not a percentage
      }

      // Ensure discount is not greater than the subtotal
      if (discount_ > subtotal) {
        discount_ = subtotal; // Discount can't be greater than the subtotal
      }

      const totalAmount = subtotal - discount_;
      console.log("Total amount after discount:", totalAmount);

      // Create payment with multiple methods specified
      const payment = await mollieClient.payments.create({
        amount: {
          currency: "EUR",
          value: totalAmount.toFixed(2), // Round to two decimal places
        },
        description: "Order description here",
        redirectUrl: `${process.env.CLIENT_URL}/shop/success`, // Make sure this URL is correct
        method: ["ideal", "creditcard", "paypal", "applepay"], // Specified methods
      });

      // Save payment data and link it to the user/order
      await strapi.entityService.create("api::payment.payment", {
        data: {
          mollieId: payment.id,
          amount: totalAmount,
          status: "pending",
          shop_items: cartItems.map((item) => ({ id: item.id })), // Save only the IDs of the cart items
        },
      });

      // Respond with the payment URL for the frontend to redirect to Mollie’s payment page
      ctx.send({ paymentUrl: payment.links.checkout.href });
    } catch (error) {
      console.error(error);
      ctx.throw(400, `Payment creation failed: ${error.message}`);
    }
  },
};
