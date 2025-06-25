'use client';

import styled from '@emotion/styled';
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
  flex-direction: column;
  align-content: center;
  text-align: left;
  width: fit-content;
  max-width: 17.8125rem;

  padding: 12px;

  color: var(--neutral-color-800);
  background-color: var(--neutral-color-200);
  border-radius: 1.25rem;

  line-height: 175%;

  :hover,
  :active {
    background-color: var(--neutral-color-300);
    transition: all 0.2s ease-in-out;
  }
`;
