import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ZigZag Trading Academy — independent Next.js app (no Edge Lab coupling). */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // transpilePackages not required for three/r3f in modern Next; keep config minimal.
};

export default nextConfig;
