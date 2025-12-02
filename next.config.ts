import type { NextConfig } from "next";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;
if (!CLOUDINARY_FOLDER) {
  throw new Error("Please define the CLOUDINARY_FOLDER environment variable");
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
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
        pathname: `**/${CLOUDINARY_FOLDER}/**`,
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
