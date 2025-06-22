'use client';

import styled from '@emotion/styled';
import BackIcon from '@/assets/BackIcon.svg';
import SmileIcon from '@/assets/SmailIcon.svg';
import { Title6 } from '@/app/typography';

interface HeaderProps {
  state_message: string;
}

export default function Header({ state_message }: HeaderProps) {
  return (
    <Container>
      <StyledBackIcon />
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
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;

  padding: 2.13rem;
  gap: 5.81rem;

  color: var(--neutral-color-300);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 3.85%,
    rgba(255, 255, 255, 0.68) 12.02%,
    rgba(255, 255, 255, 0.84) 19.47%,
    rgba(255, 255, 255, 0.92) 23.2%,
    #fff 33.65%
  );
  :hover {
    color: var(--neutral-color-500);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;

const StyledBackIcon = styled(BackIcon)``;

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
