'use client';

import styled from '@emotion/styled';

interface SubCardProps {
  thumbnail_url: string;
  source: string;
  title: string;
}

export default function SubCard({ thumbnail_url, source, title }: SubCardProps) {
  return (
    <Card>
      <MiniThumbnail src={thumbnail_url} alt="썸네일" />
      <MiniSource>{source}</MiniSource>
      <MiniTitle>{title}</MiniTitle>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiniThumbnail = styled.img`
  width: 100%;
  height: 100px;
  border-radius: 20px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const MiniSource = styled.div`
  font-size: 12px;
  color: var(--primary-color-400);
`;

const MiniTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--neutral-color-800);
  line-height: 1.4;
`;