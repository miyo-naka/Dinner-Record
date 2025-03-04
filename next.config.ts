import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "firebase-admin": false, // クライアントサイドで firebase-admin を読み込まないようにする
      };
    }
    return config;
  },
};

export default nextConfig;
