module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "strapi-provider-email-mailjet",
      providerOptions: {
        publicApiKey: env("MAILJET_API_KEY"),
        secretApiKey: env("MAILJET_SECRET_KEY"),
      },
      settings: {
        defaultFrom: env("MAILJET_SENDER_EMAIL"),
        defaultFromName: env("De Gastuin"),
        defaultTo: env("MAILJET_SENDER_EMAIL"),
        defaultToName: env("De Gastuin"),
        defaultReplyTo: env("MAILJET_SENDER_EMAIL"),
      },
    },
  },
  "map-field": {
    enabled: true,
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
