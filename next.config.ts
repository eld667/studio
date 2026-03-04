import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return {
      beforeFiles: [
        // 1. THE PAGE TUNNEL: Maps your subfolder to the client's root
        {
          source: '/client/thevikingmethod/:path*',
          destination: 'https://thevikingmethod.vercel.app/:path*',
        },

        // 2. THE STATIC CHUNK TUNNEL: Fixes the "Plain Text/White Screen" issue
        // This routes CSS, JS, and font chunks from the client's deployment
        {
          source: '/_next/static/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/_next/static/:path*',
        },

        // 3. THE IMAGE OPTIMIZATION TUNNEL: Routes image processing requests
        {
          source: '/_next/image/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/_next/image/:path*',
        },

        // 4. THE PUBLIC ASSET TUNNEL: Routes requests for /images/, /icons/, etc.
        {
          source: '/images/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/images/:path*',
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