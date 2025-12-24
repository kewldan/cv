import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${process.env.API_URL_ENDPOINT}/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
