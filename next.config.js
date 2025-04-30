// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 🔥 This enables static export mode in Next.js 14+
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
  trailingSlash: true,
};

module.exports = nextConfig;
