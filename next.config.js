/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  staticPageGenerationTimeout: 900, // 15 minutes in seconds
};

module.exports = nextConfig;
