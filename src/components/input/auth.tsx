'use client';

import { useState } from 'react';

import styled from '@emotion/styled';
import { Button3, Caption3 } from '@/app/typography';

interface AuthInputProps {
  placeHolder: string;
  wrongMessage: string;
}

export default function AuthInput({
  placeHolder,
  wrongMessage
}: AuthInputProps) {
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [doubleCheck, setDoubleCheck] = useState<boolean>(false);

  // ui 테스트용
  const handleClick = () => {
    setIsWrong(prev => !prev);
  };

  return (
    <Container>
      <InputWrapper placeholder={placeHolder} $state={isWrong} />
      {isWrong && <Caption>{wrongMessage}</Caption>}
      <Test onClick={handleClick}>테스트</Test>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  margin: 0;
  padding: 0;

  gap: 3px;
`;

const InputWrapper = styled.input<{ $state: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 19.9375rem;
  height: 3.5rem;
  padding: 0rem 1rem;

  gap: 0.625rem;

  outline: none;
  border-radius: 1.25rem;
  border: ${({ $state }) =>
    $state ? '1px solid var(--semantic-error-50)' : 'none'};
  background-color: ${({ $state }) =>
    $state ? 'var(--semantic-error-20)' : 'var(--neutral-color-10)'};
  color: ${({ $state }) =>
    $state ? 'var(--semantic-error-300)' : 'var(--neutral-color-400)'};

  &::placeholder {
    ${Button3}
    color: ${({ $state }) =>
      $state ? 'var(--semantic-error-300)' : 'var(--neutral-color-400)'};
  }
`;

const Caption = styled.span`
  ${Caption3}
  color: var(--semantic-error-300);
`;

const Test = styled.button`
  color: red;
`;
