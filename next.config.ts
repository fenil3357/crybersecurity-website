import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits plain HTML/CSS/JS into /out (no server needed)
  output: "export",
  // Default image optimizer needs a server; serve images as-is in static export
  images: { unoptimized: true },
  // /about -> /about/index.html so routes work on any static host
  trailingSlash: true,
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
