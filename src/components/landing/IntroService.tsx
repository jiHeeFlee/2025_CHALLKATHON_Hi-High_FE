'use client';

import styled from '@emotion/styled';
import { Title2, Body4 } from '@/app/typography';
import LineBar from '../status/LineBar';
import { LANDING_CONTENTS } from '@/constants/auth';

export default function IntroService() {
  return (
    <Container>
      <LineBar total={3} current={1} />
      <Header>
        <HeaderTitle>{LANDING_CONTENTS[1].title}</HeaderTitle>
        <HeaderBody>{LANDING_CONTENTS[1].body}</HeaderBody>
      </Header>
      <Body src="/assets/images/RANDING.png" alt="렌딩페이지 첫번째 이미지" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 1rem;

  gap: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderTitle = styled.span`
  ${Title2}
  color: var(--neutral-color-800);
`;

const HeaderBody = styled.span`
  ${Body4}
  color: var(--neutral-color-500);
`;

const Body = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
`;
