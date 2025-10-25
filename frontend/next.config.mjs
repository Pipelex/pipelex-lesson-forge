// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  experimental: {
    nextScriptWorkers: false,
    reactCompiler: false,
  },
  images: { domains: [] },
  env: {
    FASTAPI_URL: process.env.FASTAPI_URL,
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias };
    return config;
  },
};

export default nextConfig;
