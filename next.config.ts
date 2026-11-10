import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // v0 previews the dev server on a *.vercel.run sandbox address
  allowedDevOrigins: ['*.vercel.run'],
};

export default nextConfig;
