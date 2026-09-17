import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repositoryName = "landport-mockup";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ["172.31.98.221"],
  devIndicators: false,
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repositoryName}` : "",
  assetPrefix: isProduction ? `/${repositoryName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
