'use client';

import styled from '@emotion/styled';

import Header from './components/Header';

export default function Home() {
  return (
    <Container>
      <Header />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;

  background-color: #fff;
`;
