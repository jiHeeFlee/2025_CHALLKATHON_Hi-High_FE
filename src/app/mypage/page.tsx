'use client';

import styled from '@emotion/styled';
import NavigationBar from '../home/components/NavigationBar';

export default function Mypage() {
  return (
    <Container>
      <h1>Mypage page</h1>
      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  justify-content: center;
  align-items: center;
`;
