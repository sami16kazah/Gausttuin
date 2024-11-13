module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: 'in-v3.mailjet.com', // Mailjet SMTP host
          port: 587, // SMTP port for Mailjet
          secure:true,
          auth: {
            user: env('MAILJET_API_KEY'), // Mailjet API Key
            pass: env('MAILJET_SECRET_KEY'), // Mailjet Secret Key
          },
        },
        settings: {
          defaultFrom: env('MAILJET_SENDER_EMAIL'), // Your sender email address
          defaultReplyTo: env('MAILJET_SENDER_EMAIL'), // Default reply-to email
        },
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    },
  }


);
  