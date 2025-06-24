'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import KeywordList from './components/KeywordList';
import Keyword from './[keyword]/page';
import { mock } from 'node:test';
import NavigationBar from './components/NavigationBar';

const moke = {
  user_name: '승민',
  date: '2025.06.23 20시 기준',
  Keyword: '테스트',
  thumbnail_ur:
    'https://libapps-au.s3-ap-southeast-2.amazonaws.com/accounts/165593/images/apa7th.png',
  source: '테스트',
  title: '테스트중임1. 테스트중임1. 테스트중임1. 테스트중임1'
};

const mockKeywordList = {
  keyword: '오늘의테크뉴스',
  cards: [
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1581093588401-22d84d84f5e3?auto=format&fit=crop&w=400&q=80',
      source: 'BBC',
      title: 'AI가 바꾼 뉴스 제작 현장',
      key_word: '프론트',
      id: 1
    },
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1610484826917-29f643f80cd3?auto=format&fit=crop&w=400&q=80',
      source: 'CNN',
      title: 'ChatGPT의 진짜 가능성과 한계',
      key_word: '프론트',
      id: 2
    },
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
      source: 'The Verge',
      title: '메타버스, 트렌드인가 사라질까?',
      key_word: '백',
      id: 1
    },
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1603791452906-c5d7c9c09774?auto=format&fit=crop&w=400&q=80',
      source: 'Wired',
      title: '스마트폰 혁신의 끝은 어디인가',
      key_word: '프론트',
      id: 1
    },
    {
      thumbnail_url:
        'https://images.unsplash.com/photo-1629442828234-3530f927fbf7?auto=format&fit=crop&w=400&q=80',
      source: 'TechCrunch',
      title: '스타트업 투자, 2024 흐름은?',
      key_word: '프론트',
      id: 1
    }
  ]
};

export default function Home() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // 최초 렌더링 후에 innerHeight 읽기
    setHeight(window.innerHeight);
  }, []);
  return (
    <Container style={{ height: `${height}px` }}>
      <ScrollWrapper>
        <Header user_name={moke.user_name} date={moke.date} />
        <ContentsArea>
          <KeywordList
            keyword={mockKeywordList.keyword}
            cards={mockKeywordList.cards}
          />
          <KeywordList
            keyword={mockKeywordList.keyword}
            cards={mockKeywordList.cards}
          />
        </ContentsArea>
      </ScrollWrapper>
      <StyledNavigationBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;

  background-color: #fff;

  /* overflow-y: scroll; */
  height: 100vh;
  overflow: hidden;
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Container 안에서 꽉 참 */
  overflow-y: auto; /* 헤더+컨텐츠만 세로 스크롤 */
  padding-bottom: 4.6875rem;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentsArea = styled.div`
  all: unset;

  height: 100%;
  flex: 1;
  /* overflow-y: auto; */
  padding-bottom: 4.6875rem;
`;

const StyledNavigationBar = styled(NavigationBar)`
  position: fixed;
  bottom: 0;

  width: 100%;
  z-index: 10;
`;
