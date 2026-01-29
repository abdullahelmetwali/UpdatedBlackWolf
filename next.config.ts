import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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