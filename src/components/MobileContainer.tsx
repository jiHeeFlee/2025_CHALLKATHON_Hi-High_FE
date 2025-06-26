'use client';

import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
}

export default function MobileContainer({ children }: MobileContainerProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  width: 375px; // 더 작은 모바일 너비
  min-height: 100vh;
  max-height: 100vh;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  overflow-x: hidden;
  overflow-y: auto;
`;
