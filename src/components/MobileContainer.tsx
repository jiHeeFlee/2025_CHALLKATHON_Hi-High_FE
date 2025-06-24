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

  justify-content: center;
  align-items: center;

  position: relative;
  width: 390px; // iphone 14 너비
  height: 812px;

  margin: 0 auto;
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  overflow-x: hidden;
`;
