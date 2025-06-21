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
  width: 390px; // iphone 14 너비
  /* min-height: 844px; */
  min-height: 100vh;

  margin: 0 auto;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  overflow-x: hidden;
`;
