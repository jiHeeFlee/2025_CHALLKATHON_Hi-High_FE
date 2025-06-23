'use client';

import styled from '@emotion/styled';
import { useRouter, usePathname } from 'next/navigation';
import HomeIcon from '@/assets/HomeIcon.svg';
import GptIcon from '@/assets/GptIcon.svg';
import UserIcon from '@/assets/UserIcon.svg';

const IconList = [
  {
    icon: <HomeIcon />,
    router: '/home'
  },
  {
    icon: <GptIcon />,
    router: '/chat'
  },
  {
    icon: <UserIcon />,
    router: '/mypage'
  }
];

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container>
      {IconList.map((item, index) => {
        const isActive = pathname === item.router;

        return (
          <IconWrapper
            key={index}
            isActive={isActive}
            onClick={() => router.push(item.router)}
          >
            {item.icon}
          </IconWrapper>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  z-index: 10;

  display: flex;
  width: 100%;
  height: 4.6875rem;
  justify-content: center;
  align-items: center;
  gap: 4.6875rem;

  border-radius: 1.5625rem 1.5625rem 0rem 0rem;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`;

const IconWrapper = styled.button<{ isActive: boolean }>`
  all: unset;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.5rem;
  height: 2.5rem;

  color: ${({ isActive }) =>
    isActive ? 'var(--primary-color-400)' : 'var(--neutral-color-400)'};

  :hover {
    color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-800);
    transition: all 0.2s ease-in-out;
  }
`;
