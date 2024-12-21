/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Add your image domains here
  },
  async headers() {
    return [
      {
        // Apply headers to all API routes
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
  experimental: {
    appDir: true, // If you're using the new app directory in Next.js 13
  },
};

export default nextConfig;
