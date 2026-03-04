import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Standard build bypasses
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. The Redirect Engine
  async redirects() {
    return [
      {
        // When a user goes to your agency's subfolder path...
        source: '/client/thevikingmethod/:path*',
        // ...they are sent directly to the client's working Vercel deployment.
        destination: 'https://thevikingmethod.vercel.app/:path*',
        // 'false' is better for staging; 'true' is for permanent SEO moves.
        permanent: false,
      },
    ];
  },

  // 3. Image Optimization for your own agency assets
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
};

export default nextConfig;