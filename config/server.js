
module.exports = ({ env }) => ({
  host: '0.0.0.0', // Allows Render to handle the IP assignment
  port: env.int('PORT', 1337), // Render sets this automatically
  app: {
    keys: env.array('APP_KEYS'), // Ensure APP_KEYS is set
  },
  url: `https://${env('RENDER_EXTERNAL_HOSTNAME')}`, // Public URL if required for your app setup
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});