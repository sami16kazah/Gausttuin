// File: src/api/email/routes/email.js

module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/payment',
        handler: 'payment.payment',
        config:{
            auth:false,
        }
      },
    ],
  };
  