'use client';

import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container>
      <Logo src="/assets/images/Logo.svg" alt="하이 로고" />
      <MainText>로그인 중이에요...</MainText>
      <SubText>잠시만 기다려 주세요 :)</SubText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 24px;
`;

const MainText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a96fe;
  margin-bottom: 8px;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #888888;
`;
