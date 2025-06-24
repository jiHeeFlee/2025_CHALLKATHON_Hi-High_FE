'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Title2, Body4 } from '@/app/typography';
import { LANDING_CONTENTS } from '@/constants/auth';

import LineBar from '../status/LineBar';
import AuthButton from '../button/AuthButton';

export default function Login() {
  const googleURL = `https://hihigh.lion.it.kr/oauth2/authorization/google`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <Container>
      <Header>
        <HeaderTitle>{LANDING_CONTENTS[3].title}</HeaderTitle>
        <HeaderBody>{LANDING_CONTENTS[3].body}</HeaderBody>
      </Header>

      <ImageContainer>
        <Body src="/assets/images/RANDING.png" alt="랜딩 이미지" />

        <LoginButton
          content="Google 계정으로 계속"
          onClick={handleGoogleLogin}
        />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  gap: 2.8rem;

  height: 100%;
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const HeaderTitle = styled.span`
  ${Title2}
  color: var(--neutral-color-800);
`;

const HeaderBody = styled.span`
  ${Body4}
  color: var(--neutral-color-500);
  text-align: center;
  white-space: pre-line;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Body = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;

  /* position: absolute;
  bottom: 0px; */
`;

const LoginButton = styled(AuthButton)`
  color: #ffffff;
  background-color: var(--primary-color-500);
  border-radius: 20px;
  position: absolute;
  bottom: 5rem;
  border: none;

  &:hover {
    background-color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }

  &:active {
    background-color: var(--primary-color-800);
    transition: all 0.2s ease-in-out;
  }
`;
