'use client';

import styled from '@emotion/styled';

import AuthInput from '@/components/input/auth';

export default function Login() {
  return (
    <Container>
      <h1>Login page</h1>
      <AuthInput placeHolder="test" wrongMessage="테스트-틀림" />
    </Container>
  );
}

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;
