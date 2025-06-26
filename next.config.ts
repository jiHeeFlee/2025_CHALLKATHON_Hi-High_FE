import type { NextConfig } from 'next';
import path from 'path';
import withPWA from 'next-pwa';

// pwa 설정
const pwaOptions = {
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  disable: false,
  register: true,
  skipWaiting: true
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    // emotion 지원 활성화
    emotion: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false, // 브라우저 환경에서 canvas 비활성화
        fs: false,
        path: false
      };
    }

    // svg에 css 적용하기 위한 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
            ref: true
          }
        }
      ]
    });

    return config;
  }
};

// export default nextConfig;
export default withPWA(pwaOptions)(nextConfig);
