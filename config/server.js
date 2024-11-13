module.exports = ({ env }) => ({
  host: env("HOST"), // Allows Render to handle the IP assignment
  port: env.int("PORT"), // Render sets this automatically
  proxy: true,
     url: env('API_URL'), // Sets the public URL of the application.
  app: {
    keys: env.array("APP_KEYS"), // Ensure APP_KEYS is set
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
