import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
            // matching all API routes
            source: "/api/(.*)",
            headers: [
                { key: "Access-Control-Allow-Origin", value: "*" },
                {
                    key: "Access-Control-Allow-Methods",
                    value: "GET,DELETE,POST,PUT"
                }
            ]
        }
    ];
}
};

export default nextConfig;
