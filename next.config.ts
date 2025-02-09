import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["covers.openlibrary.org"], // ✅ Autoriser ce domaine pour les images externes
  },
};

export default nextConfig;
