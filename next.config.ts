import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'testweb.adventzeventz.com',
        pathname: '/news-api/images/news/**',
      },
      {
        protocol: 'https',
        hostname: 'testweb.adventzeventz.com',
        pathname: '/storage/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'testweb.adventzeventz.com',
        pathname: '/storage/images/**',
      },
      {
        protocol: 'https',
        hostname: 'testweb.adventzeventz.com',
        pathname: '/storage/files/**',
      },
    ],
  },
};

export default nextConfig;
