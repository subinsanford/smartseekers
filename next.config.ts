import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sit.seekersplus.ai',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
