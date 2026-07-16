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
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    return [
      { source: "/api/payments/:path*", destination: `${apiBase}/payments/:path*` },
      { source: "/api/events/:path*", destination: `${apiBase}/events/:path*` },
      { source: "/api/auth/:path*", destination: `${apiBase}/auth/:path*` },
      { source: "/api/follows/:path*", destination: `${apiBase}/follows/:path*` },
    ];
  },
};

export default nextConfig;
