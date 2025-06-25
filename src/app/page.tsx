'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/auth/cookie';

import IntroService from '@/components/landing/IntroService';
import IntroTeam from '@/components/landing/IntroTeam';
import Login from '@/components/landing/Login';

import LandingButton from '@/components/button/LandingButton';
import LineBar from '@/components/status/LineBar';

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<'service' | 'team' | 'login'>('service');
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token) {
      router.push('/home');
    }
  }, [router]);

  const handleSkip = () => {
    setStep('login');
  };

  const handleNext = () => {
    if (step === 'service') {
      setStep('team');
    } else if (step === 'team') {
      setStep('login');
    }
  };

  useEffect(() => {
    if (step === 'team') {
      setCurrent(2);
    } else if (step === 'login') {
      setCurrent(3);
    }
  }, [step]);

  return (
    <Container>
      <LineBar total={3} current={current} />
      {step === 'service' && <IntroService />}
      {step === 'team' && <IntroTeam />}
      {step === 'login' && <Login />}
      {step !== 'login' && (
        <LandingButton onSkipClick={handleSkip} onNextClick={handleNext} />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #fff;

  /* padding: 3rem 0; */
`;
