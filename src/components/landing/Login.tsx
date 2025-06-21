'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import { Title2, Body4 } from '@/app/typography';
import { LANDING_CONTENTS, LANDING_BUTTON_MESSAGE } from '@/constants/auth';

import LineBar from '../status/LineBar';
import AuthButton from '../button/AuthButton';

export default function Login() {
  const router = useRouter();
  return (
    <Container>
      <LineBar total={3} current={3} />
      <Header>
        <HeaderTitle>{LANDING_CONTENTS[3].title}</HeaderTitle>
        <HeaderBody>{LANDING_CONTENTS[3].body}</HeaderBody>
      </Header>
      <SignupButton
        content="test-signup"
        onClick={() => router.push('signup')}
      />
      <LoginButton content="test-login" onClick={() => router.push('login')} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 1rem;

  gap: 3rem;

  min-height: 100%;
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

const SignupButton = styled(AuthButton)`
  color: #fff;
  background-color: var(--primary-color-400);
  border: none;

  :hover {
    background-color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }

  :active {
    background-color: var(--primary-color-800);
    transition: all 0.2s ease-in-out;
  }
`;

const LoginButton = styled(AuthButton)`
  color: var(--primary-color-500);
  background-color: var(--primary-color-20);
  border: 1px solid var(--primary-color-400);

  :hover {
    background-color: var(--primary-color-25);
    border: 1px solid var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: #fff;
    background-color: var(--primary-color-50);
    border: 1px solid var(--primary-color-700);
    transition: all 0.2s ease-in-out;
  }
`;
