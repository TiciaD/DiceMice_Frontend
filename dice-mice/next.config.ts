import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com'], // Add the Discord CDN domain here
  },
};

export default nextConfig;
