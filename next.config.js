const repoName = "Portfolio"; // EXACT name, case-sensitive

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
