import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Tree shaking optimization
    config.optimization = {
      ...config.optimization,
      usedExports: true,
      sideEffects: false,
    };
    
    return config;
  },
  
  // Remove unused code in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
