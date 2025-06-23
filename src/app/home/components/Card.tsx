'use client';

import styled from '@emotion/styled';
import { Title6, Caption2 } from '@/app/typography';

interface CardProps {
  thumbnail_url: string;
  source: string;
  title: string;
}

export default function Card({ thumbnail_url, source, title }: CardProps) {
  return (
    <CardContainer>
      <CardImage thumbnail_url={thumbnail_url} />
      <CardSource>{source}</CardSource>
      <CardTitle>{title}</CardTitle>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 245px;
  height: max-content;

  padding: 13px 7px;

  border-radius: 7px;
  background-color: transparent;
  :hover {
    background-color: var(--neutral-color-100);
    transition: all 0.2s ease-in-out;
  }
  :active {
    background-color: var(--primary-color-10);
    transition: all 0.2s ease-in-out;
  }
`;

const CardImage = styled.div<{ thumbnail_url: string }>`
  width: 245px;
  height: 135px;

  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => props.thumbnail_url});
`;

const CardSource = styled.span`
  ${Caption2}
  color: var(--primary-color-500);
`;

const CardTitle = styled.span`
  ${Title6}
  color: var(--neutral-color-800);
`;
