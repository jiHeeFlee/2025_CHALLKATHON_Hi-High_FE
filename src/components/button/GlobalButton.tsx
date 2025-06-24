'use client';

import styled from '@emotion/styled';

const GlobalBtn = styled.button`
  display: flex;
  width: 319px;
  height: 56px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 20px;
  background-color: var(--primary-color-200);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  :hover {
    background: var(--primary-color-500);
  }
`;

export default function GlobalButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <GlobalBtn {...props}>{children}</GlobalBtn>;
}
