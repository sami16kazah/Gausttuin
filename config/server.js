module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"), // Default to 0.0.0.0 if HOST is not set
  port: env.int("PORT", 1337),   // Default to 1337 if PORT is not set
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
