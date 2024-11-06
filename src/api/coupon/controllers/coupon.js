// ./src/api/coupon/controllers/coupon.js
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::coupon.coupon', ({ strapi }) => ({
  async validateCoupon(ctx) {
    const { code } = ctx.request.body; // Get the coupon code from the request body

    try {
      const coupon = await strapi.db.query('api::coupon.coupon').findOne({
        where: { code },
      });

      if (!coupon) {
        return ctx.throw(400, 'Invalid coupon code');
      }

      if (coupon.MaxUsage <= 0) {
        return ctx.throw(400, 'Coupon usage limit reached');
      }

      return ctx.send({
        message: 'Coupon applied successfully!',
        discount: coupon.discount, // Send the discount value
      });
    } catch (err) {
      return ctx.throw(500, 'Internal server error');
    }
  },
}));
