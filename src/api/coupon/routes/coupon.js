// ./src/api/coupon/routes/coupon.js
'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::coupon.coupon', {
  config: {
    routes: [
      {
        method: 'POST',  // POST method
        path: '/coupon/validate',  // The path should match your request
        handler: 'coupon.validateCoupon',  // Controller method
        config: {
          auth: false, // No authentication required
          policies: [],
          middlewares: [],
        },
      },
     ],
  },
});
