import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 1. ADD REWRITES BLOCK HERE
  async rewrites() {
    return [
      {
        // This makes eldworkstudio.com/client/thevikingmethod 
        // pull content from your other Vercel project
        source: '/client/thevikingmethod/:path*',
        // REPLACE the URL below with your actual Vercel URL from Step 1
        destination: 'https://the-viking-method.vercel.app/client/thevikingmethod/:path*',
      },
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;