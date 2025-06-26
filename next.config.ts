// next.config.ts
import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const pwaOptions = {
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: { emotion: true },

  // --- 여기가 핵심: standalone 모드로 전환 ---
  output: 'standalone',

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
  },

  // --- ESLint 빌드 중 에러 무시하기 (선택 사항) ---
  eslint: {
    // 빌드 단계에서 ESLint 오류를 무시하고 넘어갑니다
    ignoreDuringBuilds: true
  }
};

export default withPWA(pwaOptions)(nextConfig);
