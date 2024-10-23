/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com'], // Add other image domains if needed
  },
  staticPageGenerationTimeout: 900, // 15 minutes in seconds
};

module.exports = nextConfig;
