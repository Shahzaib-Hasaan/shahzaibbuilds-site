/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
};

module.exports = nextConfig;
