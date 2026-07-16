import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "**.ibb.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return [
      { source: "/api/payments/:path*", destination: "http://localhost:5000/payments/:path*" },
      { source: "/api/events/:path*", destination: "http://localhost:5000/events/:path*" },
      { source: "/api/auth/:path*", destination: "http://localhost:5000/auth/:path*" },
      { source: "/api/follows/:path*", destination: "http://localhost:5000/follows/:path*" },
    ];
  },
};

export default nextConfig;
