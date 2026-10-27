import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A production build must not replace assets used by the live dev preview.
  distDir: process.env.VERCEL === '1' || process.env.NODE_ENV === 'development' ? '.next' : '.next-production',
};

export default nextConfig;
