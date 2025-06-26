import type { Metadata } from 'next';
import './globals.css';

import MobileContainer from '@/components/MobileContainer';
import { Z_ASCII } from 'zlib';

export const metadata: Metadata = {
  title: 'Hi-High',
  description: '2025_Challkathon_Hi-High',
  icons: {
    icon: './favicon.ico' // 변경하기
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA 매니페스트 */}
        <link rel="manifest" href="/manifest.json" />
        {/* 상태 바 색상 */}
        <meta name="theme-color" content="#0070f3" />
        {/* iOS 홈스크린 아이콘 */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body style={{ backgroundColor: '#fff' }}>
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
