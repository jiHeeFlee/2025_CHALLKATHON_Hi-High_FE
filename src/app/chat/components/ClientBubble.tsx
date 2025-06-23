'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

interface ClientBubbleProps {
  ask_string: string;
}

export default function ClientBubble({ ask_string }: ClientBubbleProps) {
  return (
    <Container>
      <Wrapper>{ask_string}</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-content: center;
  text-align: left;
  width: fit-content;
  max-width: 220px;

  padding: 12px;

  color: #fff;
  background-color: var(--primary-color-400);
  border-radius: 1.25rem;

  :hover,
  :active {
    background-color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;
