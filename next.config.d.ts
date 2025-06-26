// next.config.d.ts
// Next.js 타입을 전역으로 확장하기 위한 선언 파일입니다.
// 이 파일이 tsconfig.json의 "include" 경로에 포함되어야 합니다.

// 1) next 모듈 임포트(내용은 없어도 됩니다)
import 'next';

// 2) next 모듈 안의 ExperimentalConfig 인터페이스 확장
declare module 'next' {
  interface ExperimentalConfig {
    /**
     * outputFileTracing 기능을 끌지 여부
     * https://nextjs.org/docs/advanced-features/output-file-tracing
     */
    outputFileTracing?: boolean;
  }
}
