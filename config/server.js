module.exports = ({ env }) => ({
  host: env('HOST'), // Allows Render to handle the IP assignment
  port: env.int("PORT"), // Render sets this automatically
  app: {
    keys: env.array("APP_KEYS"), // Ensure APP_KEYS is set
  },
  url: `https://${env("RENDER_EXTERNAL_HOSTNAME")}`, 
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  admin: {
    // ...
    path: '/admin',
    build: {
      backend: env('ADMIN_BUILD_BACKEND', 'https://gastuin.onrender.com'),
    },
  },
});