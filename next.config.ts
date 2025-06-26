import type { NextConfig } from 'next';
import path from 'path';
import withPWA from 'next-pwa';

const pwaOptions = {
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true
  },
  experimental: {
    outputFileTracing: false
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false
      };
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgo: true, titleProp: true, ref: true }
        }
      ]
    });

    return config;
  }
};

export default withPWA(pwaOptions)(nextConfig);
