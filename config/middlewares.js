module.exports = [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: ["http://localhost:3000","http://localhost:1337"], // Only allow requests from Next.js frontend
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Restrict allowed methods if needed
      headers: ["Content-Type", "Authorization"], // Allow only specific headers if needed
    },
  },

  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",

];
