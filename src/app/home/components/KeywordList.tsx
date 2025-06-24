'use client';

import styled from '@emotion/styled';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Title4, Body4 } from '@/app/typography';
import Card from './Card';

interface KeywordListProps {
  keyword: string;
  cards: {
    thumbnail_url: string;
    source: string;
    title: string;
    key_word: string;
    id: number;
  }[];
}

export default function KeywordList({ keyword, cards }: KeywordListProps) {
  const router = useRouter();

  return (
    <Container>
      <Header>
        <Keyword>{keyword}</Keyword>
        <More onClick={() => router.push(`/home/${keyword}`)}>더보기</More>
      </Header>
      <List>
        {cards.map((card, index) => (
          <Card
            key={index}
            thumbnail_url={card.thumbnail_url}
            source={card.source}
            title={card.title}
            key_word={card.key_word}
            id={card.id}
          />
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: max-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* overflow: scroll; */
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  padding: 25px;
`;

const Keyword = styled.span`
  ${Title4}
  color: var(--neutral-color-800);
`;

const More = styled.span`
  ${Body4}

  cursor: pointer;

  color: var(--primary-color-400);

  :hover {
    color: var(--primary-color-400);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-900);
    transition: all 0.2s ease-in-out;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: max-content;

  overflow-x: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
