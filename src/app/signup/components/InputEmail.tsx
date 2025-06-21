'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ky from 'ky';

import AuthInput from '@/components/input/AuthInput';
import AuthButton from '@/components/button/AuthButton';

import {
  SIGNUP_CONTENTS,
  SIGNUP_INPUT_PLACEHOLDER_MESSAGE,
  SIGNUP_BUTTON_MESSAGE
} from '@/constants/auth';

interface InputEmailProps {
  email: string;
  onChange: (value: string) => void;
  onNext: () => void;
}
export default function InputEmail({
  email,
  onChange,
  onNext
}: InputEmailProps) {
  return (
    <Container>
      <label htmlFor="id">이메일</label>
      <AuthInput
        id="id"
        name="id"
        value={email}
        onChange={e => onChange(e.target.value)}
        placeHolder="이메일을 입력하세요"
        wrongMessage=""
      />
      <NextButton onClick={onNext} content="다음" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const NextButton = styled(AuthButton)`
  background: var(--primary-color-500);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;

  &:hover {
    background: var(--primary-color-600);
    transform: translateY(-0.0625rem);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }

  ${(props: any) =>
    props.$loading &&
    `
    opacity: 0.8;
    cursor: not-allowed;
  `}
`;
