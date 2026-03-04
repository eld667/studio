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
        // 1. THE PAGE TUNNEL: Routes /client/thevikingmethod to the client root
        {
          source: '/client/thevikingmethod/:path*',
          destination: 'https://thevikingmethod.vercel.app/:path*',
        },

        // 2. THE IMAGE OPTIMIZATION TUNNEL: Routes image processing to client server
        {
          source: '/_next/image/:path*',
          has: [{
            type: 'header',
            key: 'referer',
            value: '.*client/thevikingmethod.*'
          }],
          destination: 'https://thevikingmethod.vercel.app/_next/image/:path*',
        },

        // 3. THE ASSET TUNNEL: Routes direct public folder requests (like /images/door.webp)
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