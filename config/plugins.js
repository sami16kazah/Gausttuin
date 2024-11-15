module.exports = ({ env }) => ({
  email: {
    provider: 'mailjet',
    providerOptions: {
      publicApiKey: env('MAILJET_PUBLIC_KEY'),
      secretApiKey: env('MAILJET_SECRET_KEY'),
    },
    settings: {
      defaultFrom:  env('MAILJET_SENDER_EMAIL'),
      defaultReplyTo: env('MAILJET_SENDER_EMAIL'),
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
  