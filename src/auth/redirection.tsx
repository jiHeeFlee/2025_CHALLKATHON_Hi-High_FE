'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from '@/auth/cookie';

export default function GoogleLoginRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    if (accessToken && refreshToken) {
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      router.push('/input'); 
    } else {
      router.push('/login'); 
    }
  }, [accessToken, refreshToken, router]);

  return <div>로그인 중입니다...</div>;
}
