'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BackIcon from '@/assets/BackIcon.svg';
import LineBar from '@/components/status/LineBar';

import InputInfo from './components/InputInfo';
import InputEmail from './components/InputEmail';
import ky from 'ky';

interface SignupForm {
  email: string;
  password: string;
  nickname: string;
}

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<SignupForm>({
    email: '',
    password: '',
    nickname: ''
  });

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await ky
        .post(`/api/auth/signup`, { json: formData })
        .json<{ success: boolean }>();

      if (res.success) {
        router.push('/login'); // 성공 후 이동
      }
    } catch (err) {
      console.log(`회원 가입 실패 : ${err}`);
    }
  };

  return (
    <Container>
      <BackIcon onClick={() => router.push('/')} />
      <LineBar total={3} current={1} />
      {step === 1 && (
        <InputEmail
          email={formData.email}
          onChange={value => handleChange('email', value)}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <InputInfo
          password={formData.password}
          nickname={formData.nickname}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={false}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;
