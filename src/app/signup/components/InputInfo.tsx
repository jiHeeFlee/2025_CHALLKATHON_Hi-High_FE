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

interface InputInfoProps {
  password: string;
  nickname: string;
  loading: boolean;
  onChange: (name: string, value: string) => void;
  onSubmit: () => void;
}

export default function InputInfo({
  password,
  nickname,
  loading,
  onChange,
  onSubmit
}: InputInfoProps) {
  return (
    <Container
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label>비밀번호</label>
      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={e => onChange('password', e.target.value)}
        placeHolder="비밀번호"
        wrongMessage=""
      />

      <label>닉네임</label>
      <AuthInput
        name="nickname"
        value={nickname}
        onChange={e => onChange('nickname', e.target.value)}
        placeHolder="닉네임"
        wrongMessage=""
      />

      <SubmitButton type="submit" content="가입하기" disabled={loading} />
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c53030;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #fed7d7;
`;

const SuccessMessage = styled.div`
  background: #f0fff4;
  color: #38a169;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: 1px solid #9ae6b4;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color-800);
`;

const SubmitButton = styled(AuthButton)`
  background: var(--primary-color-500);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover {
    background: var(--primary-color-600);
    transform: translateY(-1px);
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
