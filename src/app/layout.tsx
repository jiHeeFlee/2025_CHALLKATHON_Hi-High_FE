import type { Metadata } from 'next';
import './globals.css';

import MobileContainer from '@/components/MobileContainer';

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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ backgroundColor: '#f5f5f5' }}>
        <MobileContainer>{children}</MobileContainer>
      </body>
    </html>
  );
}
