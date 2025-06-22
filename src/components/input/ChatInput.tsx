'use client';

import styled from '@emotion/styled';
import SendIcon from '@/assets/SendIcon.svg';

export default function ChatInput() {
  return (
    <Container>
      <Input placeholder="어떤걸 알려드릴까요?" />
      <SendButton>
        <SendIcon />
      </SendButton>
    </Container>
  );
}

const Container = styled.div`
  all: unset;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.6875rem;
  flex-shrink: 0;
  padding: 0;
  gap: 1.3rem;

  border-radius: 1.25rem 1.25rem 0rem 0rem;
  background: #fff;

  box-shadow: 0px 4px 46px 0px rgba(0, 0, 0, 0.03);
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  width: 17.6875rem;
  height: 2.75rem;
  padding: 0rem 1rem;
  justify-content: center;
  align-items: flex-start;
  gap: 0.625rem;

  outline: none;
  border: none;
  border-radius: 1.25rem;
  color: var(--neutral-color-500);
  background: var(----neutral-color-100, #f3f4f6);

  &::placeholder {
    color: var(--neutral-color-500);
  }
`;

const SendButton = styled.button`
  width: 33px;
  height: 33px;
  align-content: center;

  border: none;

  color: var(--neutral-color-400);
  background-color: transparent;

  :hover {
    color: var(--primary-color-400);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }
`;
