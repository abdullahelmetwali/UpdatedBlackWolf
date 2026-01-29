import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blackwolf-backend.vercel.app",
      },
    ],
  },
};

export default nextConfig;