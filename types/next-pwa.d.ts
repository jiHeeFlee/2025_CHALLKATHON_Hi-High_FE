// types/next-pwa.d.ts
declare module 'next-pwa' {
  import { NextConfig } from 'next';
  interface PWAConfig {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    // 필요하다면 workbox 옵션 등 추가로 선언 가능
    [key: string]: any;
  }
  function withPWA(
    pwaConfig: PWAConfig
  ): (nextConfig: NextConfig) => NextConfig;
  export default withPWA;
}
