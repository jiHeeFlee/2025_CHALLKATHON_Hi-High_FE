'use client';

import styled from '@emotion/styled';
import { Title2, Body4 } from '@/app/typography';
import LineBar from '../status/LineBar';
import { LANDING_CONTENTS } from '@/constants/auth';

export default function IntroService() {
  return (
    <Container>
      <Header>
        <HeaderBody>{LANDING_CONTENTS[1].body}</HeaderBody>
        <HeaderTitle>{LANDING_CONTENTS[1].title}</HeaderTitle>
      </Header>
      <Body src="/assets/images/Logo.svg" alt="렌딩페이지 첫번째 이미지" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  /* justify-content: center; */

  gap: 3rem;
  height: 100%;
  background-color: #fff;

  margin-bottom: 3rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 3rem 0;
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
  /* height: auto; */
  object-fit: cover;

  margin-left: 15px;
`;
