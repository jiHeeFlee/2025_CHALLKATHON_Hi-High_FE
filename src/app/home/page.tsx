'use client';

import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import instance from '@/auth/axios';

import Header from './components/Header';
import KeywordList from './components/KeywordList';
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
  const [newsData, setNewsData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, newsResponse] = await Promise.all([
          instance.get('/api/auth/user-info'),
          instance.get('/api/main')
        ]);
        console.log('=== 사용자 정보 ===');
        console.log('user-info:', userResponse.data);
        console.log('=== /api/main 응답 데이터 ===');
        console.log('main data:', newsResponse.data);
        console.log('newsByKeyword:', newsResponse.data?.newsByKeyword);
        console.log(
          'newsByKeyword 키들:',
          Object.keys(newsResponse.data?.newsByKeyword || {})
        );

        // 각 키워드별 데이터 확인
        if (newsResponse.data?.newsByKeyword) {
          Object.entries(newsResponse.data.newsByKeyword).forEach(
            ([keyword, data]) => {
              console.log(`"${keyword}" 키워드:`, data);
              console.log(
                `"${keyword}" 뉴스 개수:`,
                Array.isArray(data) ? data.length : 0
              );
            }
          );
        }
        console.log('========================');

        setUserInfo(userResponse.data);
        setNewsData(newsResponse.data);
      } catch (error: any) {
        console.error('데이터 가져오기 실패:', error);
        console.log('에러 응답:', error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: '16px',
            color: '#666'
          }}
        >
          뉴스를 불러오는 중...
        </div>
      </Container>
    );
  }
  const userName = userInfo?.name || moke.user_name;
  const currentDate =
    new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit'
    }) + ' 기준';

  return (
    <Container>
      <ScrollWrapper>
        <StyledHeader user_name={userName} date={currentDate} />{' '}
        <ContentsArea>
          {newsData?.newsByKeyword ? (
            (() => {
              console.log('🔍 KeywordList 렌더링 시작');
              const entries = Object.entries(newsData.newsByKeyword);
              console.log(
                '렌더링할 키워드 목록:',
                entries.map(([keyword]) => keyword)
              );

              return entries.map(([keyword, cards]: [string, any]) => {
                console.log(`📰 "${keyword}" 키워드 렌더링:`, {
                  keyword,
                  cardsCount: Array.isArray(cards) ? cards.length : 0,
                  cards: cards
                });

                return (
                  <KeywordList
                    key={keyword}
                    keyword={keyword}
                    cards={cards.map((news: any) => ({
                      id: news.id,
                      thumbnail_url:
                        news.thumbnailUrl ||
                        'https://via.placeholder.com/400x200',
                      source: news.source,
                      title: news.title,
                      key_word: keyword
                    }))}
                  />
                );
              });
            })()
          ) : (
            <>
              <KeywordList
                keyword={mockKeywordList.keyword}
                cards={mockKeywordList.cards}
              />
              <KeywordList
                keyword={mockKeywordList.keyword}
                cards={mockKeywordList.cards}
              />
            </>
          )}
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
  position: relative;

  background-color: #fff;

  width: 100%;
  height: 100%;
  /* min-height: 100vh; */
  /* min-height: inherit; */

  /* overflow: hidden; */
  overflow-y: scroll;
  scrollbar-width: none; // firefox : 스크롤바 숨김
  -ms-overflow-style: none; // IE, Edge : 스크롤 바 숨김
  &::-webkit-scrollbar {
    display: none; // chrome, safari : 스크롤바 숨김
  }
`;

const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  height: max-content;

  overflow-y: auto;
  padding-bottom: 4.6875rem;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentsArea = styled.div`
  all: unset;

  height: fit-content;
  flex: 1;
`;

const StyledNavigationBar = styled(NavigationBar)`
  position: absolute;
  bottom: 0;

  z-index: 10;
`;

const StyledHeader = styled(Header)`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;
