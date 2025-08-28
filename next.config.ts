import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore all TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore all ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Disable strict mode temporarily
  reactStrictMode: false,
  // Be more permissive with images
  images: {
    domains: ["avatars.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    // Allow unoptimized images
    unoptimized: true,
  },
  // Ignore specific build errors
  webpack: (config) => {
    config.ignoreWarnings = [/failed to load source map/];
    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date",
          },
        ],
      },
    ];
  },
};

const sentryConfig = {
  org: "yc-directory-9d",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
};

export default withSentryConfig(nextConfig, sentryConfig);
