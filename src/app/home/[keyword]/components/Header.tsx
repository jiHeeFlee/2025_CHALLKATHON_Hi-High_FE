'use client';

import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DetailHeaderProps {
  keyword: string;
}

export default function DetailHeader({ keyword }: DetailHeaderProps) {
  const router = useRouter();

  return (
    <Header>
      <BackButton onClick={() => router.back()}>
        <Image src="/assets/images/Back.svg" alt="back" width={24} height={24} />
      </BackButton>
      <KeywordTitle>{keyword}</KeywordTitle>
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 110px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const KeywordTitle = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: var(--neutral-color-700);
`;
