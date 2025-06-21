'use client';

import styled from '@emotion/styled';

interface LineBarProps {
  total: number;
  current: number;
}
export default function LineBar({ total, current }: LineBarProps) {
  return (
    <Container>
      {Array.from({ length: total }).map((_, index) => (
        <Line key={index} isActive={index === current - 1} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0;
  gap: 4px;
`;

const Line = styled.div<{ isActive: boolean }>`
  width: ${({ isActive }) => (isActive ? '20px' : '8px')};
  height: 8px;
  border-radius: 9999px;
  background-color: ${({ isActive }) =>
    isActive ? 'var(--primary-color-500)' : 'var(--neutral-color-200)'};
  transition: all 0.3s ease;
`;
