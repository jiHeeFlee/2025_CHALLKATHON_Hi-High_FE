// 'use client';

// import GoogleLoginRedirect from '@/auth/redirection';

// export default function GoogleLoginPage() {
//   return <GoogleLoginRedirect />;
// }

// app/googleLogin/page.tsx
'use client';

import { Suspense } from 'react';
import GoogleLoginRedirect from '@/auth/redirection';

// 이 페이지는 절대 사전 렌더링하지 않고 클라이언트에서만 처리합니다.
export const dynamic = 'force-dynamic';

export default function GoogleLoginPage() {
  return (
    <Suspense fallback={<div>로딩 중…</div>}>
      <GoogleLoginRedirect />
    </Suspense>
  );
}
