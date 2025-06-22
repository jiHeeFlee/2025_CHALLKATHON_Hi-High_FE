'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Title2, Body4 } from '@/app/typography';
import { LANDING_CONTENTS } from '@/constants/auth';

import LineBar from '../status/LineBar';
import AuthButton from '../button/AuthButton';

export default function Login() {
  const router = useRouter();

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

  const googleURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email`;

  const handleGoogleLogin = () => {
    window.location.href = googleURL;
  };

  return (
    <Container>
      <LineBar total={3} current={3} />
      <Header>
        <HeaderTitle>{LANDING_CONTENTS[3].title}</HeaderTitle>
        <HeaderBody>{LANDING_CONTENTS[3].body}</HeaderBody>
      </Header>

      <ImageContainer>
      <Body src="/assets/images/RANDING.png" alt="랜딩 이미지" />

      <LoginButton content="Google 계정으로 계속" onClick={handleGoogleLogin} />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 2rem;
  gap: 2.8rem;

  min-height: 100vh;
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
  margin-top: -2.5rem; 
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
