const isGithubPages = process.env.NODE_ENV === 'production';

// next.config.js
const nextConfig = {
  // REMOVE output: 'export'
  basePath: '/Portfolio',
  assetPrefix: '/Portfolio/',
};

module.exports = nextConfig;
