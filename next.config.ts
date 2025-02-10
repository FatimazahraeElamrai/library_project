/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ Autorise toutes les images distantes
      },
    ],
  },
};

module.exports = nextConfig;
