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
        // 1. THE PAGE TUNNEL: Renders the site at eldworkstudio.com/client/thevikingmethod
        {
          source: '/client/thevikingmethod/:path*',
          destination: 'https://thevikingmethod.vercel.app/client/thevikingmethod/:path*',
        },
        // 2. THE ASSET TUNNEL: Automatically fixes paths for images in public/image/
        {
          source: '/image/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/client/thevikingmethod/image/:path*',
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