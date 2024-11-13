module.exports = ({ env }) => ({
  host: env("HOST"), // Allows Render to handle the IP assignment
  port: env.int("PORT"), // Render sets this automaticall
     url: env('RENDER_EXTERNAL_HOSTNAME'), // Sets the public URL of the application.
  app: {
    keys: env.array("APP_KEYS"), // Ensure APP_KEYS is set
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
