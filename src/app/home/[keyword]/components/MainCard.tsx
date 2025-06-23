'use client';

import styled from '@emotion/styled';

interface MainCardProps {
  thumbnail_url: string;
  source: string;
  title: string;
  onClick?: () => void;
}

export default function MainCard({ thumbnail_url, source, title, onClick }: MainCardProps) {
  return (
    <Container
      onClick={() => {
        console.log('클릭됨');
        if (onClick) onClick();
      }}
    >
      <Source>{source}</Source>
      <Title>{title}</Title>
      <Thumbnail src={thumbnail_url} alt="대표 이미지" />
    </Container>
  );
}


const Container = styled.div`
  margin-bottom: 32px;
  cursor: pointer;
`;

const Source = styled.div`
  font-size: 12px;
  color: var(--primary-color-400);
  margin-bottom: 6px;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: var(--neutral-color-700);
  margin-bottom: 12px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
`;