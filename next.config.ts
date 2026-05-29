import type { NextConfig } from "next";
import path from "path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // assetPrefix — для CSS/JS на GitHub Pages; маршруты префиксируем через pagePath()
  assetPrefix: basePath || undefined,
  output: "export",
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default nextConfig;
