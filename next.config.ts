import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "3MB",
    },
  },
  reactCompiler: true,
};

export default nextConfig;
