import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatgpt.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
