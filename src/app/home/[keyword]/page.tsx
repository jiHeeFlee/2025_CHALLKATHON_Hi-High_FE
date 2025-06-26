'use client';

import styled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Title4 } from '@/app/typography';
import instance from '@/auth/axios';
import BackIcon from '@/assets/BackIcon.svg';
import MainCard from '@/app/home/[keyword]/components/MainCard';
import SubCard from '@/app/home/[keyword]/components/SubCard';

export default function KeywordDetailPage() {
  const router = useRouter();
  const params = useParams();
  const keyword =
    typeof params.keyword === 'string'
      ? decodeURIComponent(params.keyword)
      : '';

  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywordNews = async () => {
      try {
        const response = await instance.get('/api/main');
        console.log('=== 키워드 페이지 데이터 ===');
        console.log('keyword:', keyword);
        console.log('response.data:', response.data);
        console.log('========================');

        setNewsData(response.data);
      } catch (error: any) {
        console.error('키워드 뉴스 데이터 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeywordNews();
  }, [keyword]);

  if (loading) {
    return (
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            fontSize: '16px',
            color: '#666'
          }}
        >
          뉴스를 불러오는 중...
        </div>
      </Container>
    );
  }

  // 해당 키워드의 뉴스 데이터 찾기
  const keywordNews = newsData?.newsByKeyword?.[keyword];

  if (!keywordNews || keywordNews.length === 0) {
    return (
      <Container>
        <Empty>"{keyword}" 관련 뉴스가 없습니다.</Empty>
      </Container>
    );
  }

  // 첫 번째 뉴스를 메인 카드로, 나머지를 서브 카드로 사용
  const featuredCard = keywordNews[0];
  const otherCards = keywordNews.slice(1);
  return (
    <Container>
      <Header>
        <StyledBackIcon onClick={() => router.back()} />
        <HeaderTitle>{keyword}</HeaderTitle>
      </Header>

      <MainCard
        thumbnail_url={
          featuredCard.thumbnailUrl || 'https://via.placeholder.com/400x200'
        }
        source={featuredCard.source}
        title={featuredCard.title}
        onClick={() => {
          const detailUrl = `/home/${encodeURIComponent(keyword)}/detail/${featuredCard.id}`;
          console.log('메인카드 클릭 - 이동할 URL:', detailUrl);
          console.log(
            'featuredCard.id:',
            featuredCard.id,
            '(타입:',
            typeof featuredCard.id,
            ')'
          );
          router.push(detailUrl);
        }}
      />

      <SubCardGrid>
        {' '}
        {otherCards.map((card: any) => (
          <SubCard
            key={card.id}
            thumbnail_url={
              card.thumbnailUrl || 'https://via.placeholder.com/400x200'
            }
            source={card.source}
            title={card.title}
            onClick={() => {
              const detailUrl = `/home/${encodeURIComponent(keyword)}/detail/${card.id}`;
              console.log('서브카드 클릭 - 이동할 URL:', detailUrl);
              console.log('card.id:', card.id, '(타입:', typeof card.id, ')');
              router.push(detailUrl);
            }}
          />
        ))}
      </SubCardGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 28px 28px 28px;
  background-color: #fff;
  width: 100%;
  /* min-height: 100vh; */
  /* min-height: inherit; */
  max-height: 812px;

  overflow-y: scroll;
  scrollbar-width: none; // firefox : 스크롤바 숨김
  -ms-overflow-style: none; // IE, Edge : 스크롤 바 숨김
  &::-webkit-scrollbar {
    display: none; // chrome, safari : 스크롤바 숨김
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;
`;

const StyledBackIcon = styled(BackIcon)`
  position: absolute;
  left: 0;
  color: var(--neutral-color-300);
  cursor: pointer;

  &:hover {
    color: var(--neutral-color-500);
    transition: all 0.2s ease-in-out;
  }

  &:active {
    color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;

const HeaderTitle = styled.h1`
  ${Title4}
  color: var(--neutral-color-800);
  margin: 0;
`;

const Keyword = styled.span`
  ${Title4}
  color: var(--neutral-color-800);
`;

const SubCardGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
`;

const Empty = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #999;
`;
