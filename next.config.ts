import type { NextConfig } from "next";
import { CLOUDINARY_UPLOAD_FOLDER } from "@/lib/constant";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "3MB",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: `**/${CLOUDINARY_UPLOAD_FOLDER}/**`,
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
