const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/Portfolio' : '',
  assetPrefix: isGithubPages ? '/Portfolio/' : '',
};

module.exports = nextConfig;
