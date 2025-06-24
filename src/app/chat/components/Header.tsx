'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import BackIcon from '@/assets/BackIcon.svg';
import SmileIcon from '@/assets/SmailIcon.svg';
import { Title6 } from '@/app/typography';

interface HeaderProps {
  state_message: string;
}

export default function Header({ state_message }: HeaderProps) {
  const router = useRouter();

  return (
    <Container>
      <StyledBackIcon onClick={() => router.back()} />
      <FaceState>
        <SmileIcon />
        <Message>{state_message}</Message>
      </FaceState>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;

  padding: 2.13rem;
  gap: 5.81rem;

  color: var(--neutral-color-300);
  border-radius: 0rem 0rem 1.5625rem 1.5625rem;
  background: #fff;

  box-shadow: 0px 4px 8px 1px var(----neutral-color-10, rgba(13, 18, 22, 0.1));

  :hover {
    color: var(--neutral-color-500);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;

const StyledBackIcon = styled(BackIcon)`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const FaceState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 0.44rem;

  color: var(--neutral-color-300);
`;

const Message = styled.span`
  ${Title6}

  color:var(--neutral-color-300)
`;
