module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'), // Allows Render to handle the IP assignment
  port: env.int("PORT", 1337), // Render sets this automatically
  app: {
    keys: env.array("APP_KEYS"), // Ensure APP_KEYS is set
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),}

});
