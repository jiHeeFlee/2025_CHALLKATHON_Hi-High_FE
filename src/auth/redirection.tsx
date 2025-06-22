'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import instance from '@/auth/axios';
import { setCookie } from '@/auth/cookie';

export default function GoogleLoginRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    const postData = async () => {
      if (!code) return;

      try {
        const res = await instance.post('/api/auth/google', {
          authorizationCode: code,
        });

        const { accessToken, refreshToken } = res.data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);

        router.push('/main');
      } catch (error) {
        console.error('로그인 실패:', error);
        router.push('/login');
      }
    };

    postData();
  }, [code, router]);

  return <div>로그인 중입니다...</div>; // 간단한 로딩 표시
}
