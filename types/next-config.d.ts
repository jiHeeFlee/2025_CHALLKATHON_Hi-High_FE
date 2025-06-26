// types/next-config.d.ts

// 1) next 모듈 임포트
import 'next';

// 2) NextConfig 인터페이스 확장
declare module 'next' {
  // NextConfig.experimental 타입을 확장
  interface NextConfig {
    experimental?: {
      // outputFileTracing 기능을 끌지 여부
      outputFileTracing?: boolean;
      // 다른 실험 옵션도 안전하게 받을 수 있도록
      [key: string]: unknown;
    };
  }
}
