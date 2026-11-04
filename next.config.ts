import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page here depends on who's logged in, so pages aren't prerendered.
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
