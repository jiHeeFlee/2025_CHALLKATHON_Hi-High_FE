'use client';

import styled from '@emotion/styled';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Button4 } from '@/app/typography';
import NextArrowIcon from '@/assets/NextArrowIcon.svg';

interface LandingButtonProps {
  onSkipClick: () => void;
  onNextClick: () => void;
}

export default function LandingButton({
  onSkipClick,
  onNextClick
}: LandingButtonProps) {
  // const router = useRouter();
  return (
    <Container>
      <SkipButton onClick={onSkipClick}>skip</SkipButton>
      <NextButton onClick={onNextClick}>
        <NextArrowIcon />
      </NextButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* width: 19.4375rem; */
  width: 100%;

  padding: 0 32px;

  margin-bottom: 3rem;
`;

const SkipButton = styled.span`
  cursor: pointer;

  ${Button4}
  color: var(--neutral-color-300);

  :hover {
    color: var(--primary-color-300);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;

const NextButton = styled.button`
  align-content: center;
  width: 56px;
  height: 56px;

  outline: none;
  border: none;
  border-radius: 100px;
  color: #fff;
  background-color: var(--primary-color-500);

  :hover {
    background-color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }

  :hover {
    background-color: var(--primary-color-800);
    transition: all 0.2s ease-in-out;
  }
`;
