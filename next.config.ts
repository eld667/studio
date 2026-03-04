import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // High-velocity mode
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return {
      beforeFiles: [
        // 1. THE PAGE TUNNEL
        {
          source: '/client/thevikingmethod/:path*',
          destination: 'https://thevikingmethod.vercel.app/client/thevikingmethod/:path*',
        },
        // 2. THE IMAGE OPTIMIZATION TUNNEL (This is what you're missing)
        {
          source: '/client/thevikingmethod/_next/image/:path*',
          destination: 'https://thevikingmethod.vercel.app/client/thevikingmethod/_next/image/:path*',
        },
        // 3. THE PLURAL ASSET TUNNEL (Matches your /images/ folder)
        {
          source: '/images/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/client/thevikingmethod/images/:path*',
        },
      ],
    };
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;