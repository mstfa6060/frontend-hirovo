const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.hirovo.com",
    NEXT_PUBLIC_WP_URL: process.env.NEXT_PUBLIC_WP_URL || "https://cms.hirovo.com/wp-json",
    NEXT_PUBLIC_COMPANY_ID: process.env.NEXT_PUBLIC_COMPANY_ID || "c9d8c846-10fc-466d-8f45-a4fa4e856abd",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.hirovo.com",
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
