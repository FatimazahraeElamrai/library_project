import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["covers.openlibrary.org"], // Autoriser les images externes
  },
};

export default nextConfig;
