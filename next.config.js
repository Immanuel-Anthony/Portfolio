const repoName = "Portfolio"; // or whatever your repo is called

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Make sure your app is exported as static files
  basePath: `/${repoName}`,   // Base path to be used in all links
  assetPrefix: `/${repoName}/`, // Prefix for static assets (images, etc.)
  trailingSlash: true,        // Optional, but adds a trailing slash to URLs (useful for GitHub Pages)
};

module.exports = nextConfig;
