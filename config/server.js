module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"), // Default to 0.0.0.0 if HOST is not set
  port: env.int("PORT", 1337),   // Default to 1337 if PORT is not set
  url: env("PUBLIC_URL", "https://gastuin.onrender.com"),
  app: {
    keys: env.array("APP_KEYS", ["defaultKey"]), // Ensure APP_KEYS is an array
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
});
