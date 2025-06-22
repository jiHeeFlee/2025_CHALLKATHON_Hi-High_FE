'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

interface GptBubbleProps {
  answer_string: string;
}

export default function GptBubble({ answer_string }: GptBubbleProps) {
  return <Container>{answer_string}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 220px;

  color: var(--neutral-color-800);
  background-color: var(--neutral-color-200);

  :hover,
  :active {
    background-color: var(--neutral-color-300);
  }
`;
