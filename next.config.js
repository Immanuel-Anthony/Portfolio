const repoName = "Portfolio"; // EXACT repo name (case-sensitive)

const nextConfig = {
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  trailingSlash: true,
};

module.exports = nextConfig;
