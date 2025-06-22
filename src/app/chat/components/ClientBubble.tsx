'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

interface ClientBubbleProps {
  ask_string: string;
}

export default function ClientBubble({ ask_string }: ClientBubbleProps) {
  return <Container>{ask_string}</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 220px;

  color: #fff;
  background-color: var(--primary-color-400);

  :hover,
  :active {
    background-color: var(--primary-color-500);
  }
`;
