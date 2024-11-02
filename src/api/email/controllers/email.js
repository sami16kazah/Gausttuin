// File: src/api/email/controllers/email.js
module.exports = {
    async sendEmail(ctx) {
      try {
        await strapi.plugins['email'].services.email.send({
          to: 'samkazah444@gmail.com', // You can pass this from the frontend
          from: 'kalashcompany1@gmail.com',
          subject: 'Test Email',
          text: 'This is a test email from Strapi!',
          html: '<p>This is a test email from Strapi!</p>',
        });
  
        ctx.send({ message: 'Email sent successfully!' });
      } catch (err) {
        ctx.send({ message: 'Failed to send email', error: err });
      }
    },
  };
  