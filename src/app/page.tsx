'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import IntroService from '@/components/landing/IntroService';
import IntroTeam from '@/components/landing/IntroTeam';
import Login from '@/components/landing/Login';

export default function Home() {
  const [step, setStep] = useState<'service' | 'team' | 'login'>('service');

  useEffect(() => {
    if (step === 'service') {
      const timer = setTimeout(() => {
        setStep('team');
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (step === 'team') {
      const timer = setTimeout(() => {
        setStep('login');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [step]);
  return (
    <Container>
      {step === 'service' && <IntroService />}
      {step === 'team' && <IntroTeam />}
      {step === 'login' && <Login />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-height: 100%;

  background-color: #fff;
`;
