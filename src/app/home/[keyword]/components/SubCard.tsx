'use client';

import styled from '@emotion/styled';

interface SubCardProps {
  thumbnail_url: string;
  source: string;
  title: string;
  onClick?: () => void;
}

export default function SubCard({
  thumbnail_url,
  source,
  title,
  onClick
}: SubCardProps) {
  return (
    <Card onClick={onClick}>
      <MiniThumbnail src={thumbnail_url} alt="썸네일" />
      <MiniSource>{source}</MiniSource>
      <MiniTitle>{title}</MiniTitle>
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }
`;

const MiniThumbnail = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 8px;
`;

const MiniSource = styled.div`
  font-size: 12px;
  color: var(--primary-color-400);
`;

const MiniTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--neutral-color-800);
  line-height: 1.4;
  margin-top: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
