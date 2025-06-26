'use client';

import styled from '@emotion/styled';
import { Title2, Body4 } from '@/app/typography';
import LineBar from '../status/LineBar';
import { LANDING_CONTENTS } from '@/constants/auth';

export default function IntroTeam() {
  return (
    <Container>
      <Body src="/assets/images/TEAM_LOGO.png" alt="렌딩페이지 두번째 이미지" />
      <Header>
        <HeaderTitle>{LANDING_CONTENTS[2].title}</HeaderTitle>
        <HeaderBody>{LANDING_CONTENTS[2].body}</HeaderBody>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  justify-content: space-between;
  align-items: center;

  height: 100%;
  min-height: 414px;

  /* padding-top: 1rem; */

  gap: 3rem;
  /* background-color: #b25858; */
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;

  white-space: pre-line;
  padding: 0 32px;
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

  margin-left: 10px;
  /* margin-top: 60px; */
`;
