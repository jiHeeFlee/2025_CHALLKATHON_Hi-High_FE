'use client';

import styled from '@emotion/styled';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
interface GptBubbleProps {
  answer_string: string;
}

export default function GptBubble({ answer_string }: GptBubbleProps) {
  return (
    <Container>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer_string}</ReactMarkdown>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-content: center;
  text-align: left;
  max-width: 17.8125rem;

  padding: 12px;

  color: var(--neutral-color-800);
  background-color: var(--neutral-color-200);
  border-radius: 1.25rem;

  :hover,
  :active {
    background-color: var(--neutral-color-300);
    transition: all 0.2s ease-in-out;
  }
`;

const StyledReactMarkdown = styled(ReactMarkdown)`
  margin: 0;
  padding: 0;
`;
