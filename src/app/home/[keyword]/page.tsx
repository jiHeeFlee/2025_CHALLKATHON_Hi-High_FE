'use client';

import styled from '@emotion/styled';
import { useParams } from 'next/navigation';
import { Title4 } from '@/app/typography';
import { useRouter } from 'next/navigation';
import MainCard from '@/app/home/[keyword]/components/MainCard';
import SubCard from '@/app/home/[keyword]/components/SubCard';

const mockKeywordList = {
  keyword: '오늘의테크뉴스',
  cards: [
    {
      id: '1',
      thumbnail_url: 'https://images.unsplash.com/photo-1581093588401-22d84d84f5e3?auto=format&fit=crop&w=400&q=80',
      source: 'BBC',
      title: 'AI가 바꾼 뉴스 제작 현장',
    },
    {
      id: '2',
      thumbnail_url: 'https://images.unsplash.com/photo-1610484826917-29f643f80cd3?auto=format&fit=crop&w=400&q=80',
      source: 'CNN',
      title: 'ChatGPT의 진짜 가능성과 한계',
    },
    {
      id: '3',
      thumbnail_url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
      source: 'The Verge',
      title: '메타버스, 트렌드인가 사라질까?',
    },
    {
      id: '4',
      thumbnail_url: 'https://images.unsplash.com/photo-1603791452906-c5d7c9c09774?auto=format&fit=crop&w=400&q=80',
      source: 'Wired',
      title: '스마트폰 혁신의 끝은 어디인가',
    },
    {
      id: '5',
      thumbnail_url: 'https://images.unsplash.com/photo-1629442828234-3530f927fbf7?auto=format&fit=crop&w=400&q=80',
      source: 'TechCrunch',
      title: '스타트업 투자, 2024 흐름은?',
    },
  ],
};

export default function KeywordDetailPage() {
  const router = useRouter();
  const params = useParams();
  const keyword = typeof params.keyword === 'string' ? decodeURIComponent(params.keyword) : '';

  const selected = mockKeywordList.keyword === keyword ? mockKeywordList : null;
  if (!selected) return <Empty>데이터 없음</Empty>;

  const featuredCard = selected.cards[2];
  const otherCards = selected.cards.filter((_, index) => index !== 2);

  return (
    <Container>
      <MainCard
        thumbnail_url={featuredCard.thumbnail_url}
        source={featuredCard.source}
        title={featuredCard.title}
        onClick={() => 
          router.push(`/home/${encodeURIComponent(keyword)}/detail/${featuredCard.id}`)}
      />


      <Keyword>{selected.keyword}</Keyword>
      <SubCardGrid>
        {otherCards.map((card, index) => (
          <SubCard
            key={index}
            thumbnail_url={card.thumbnail_url}
            source={card.source}
            title={card.title}
          />
        ))}
      </SubCardGrid>
    </Container>
  );
}

const Container = styled.div`
  padding: 28px 28px;
  background-color: #fff;
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
