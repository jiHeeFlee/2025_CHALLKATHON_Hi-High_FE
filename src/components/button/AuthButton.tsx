'use client';

import React from 'react';
import styled from '@emotion/styled';
import { Button2 } from '@/app/typography';

interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  // url : string;
  // onClick: () => void;
  // loading: boolean;
}

const Container = styled.button`
  ${Button2}
  display: flex;
  width: 19.9375rem;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 1.25rem;
`;

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ content, ...props }, ref) => {
    return (
      <Container ref={ref} {...props}>
        {content}
      </Container>
    );
  }
);

export default AuthButton;
