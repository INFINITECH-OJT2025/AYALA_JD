import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["127.0.0.1"], // ✅ Allow Laravel API images
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/properties/**", // ✅ Ensure Next.js can fetch images
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)", // ✅ Matches all API routes
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,POST,PUT",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
