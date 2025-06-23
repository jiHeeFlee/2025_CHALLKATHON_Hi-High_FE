'use client';

import styled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import { Title4 } from '@/app/typography';

const mockArticles = [
  {
    id: '3',
    keyword: '오늘의테크뉴스',
    title: '메타버스, 트렌드인가 사라질까?',
    source: 'The Verge',
    thumbnail_url: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=400&q=80',
    date: '2025.06.22',
    content:
      "If there's a pairing of a company and a community that works better than Moog Music and Asheville, North Carolina, I don't know what it could be. The city of about 90,000 in the Blue Ridge Mountains is a cultural hub, packed with dozens of art galleries and a thriving local music scene with venues that attract acts from around the world. Asheville has been called one of America's greatest music cities, and Moog wouldn't dream of moving anywhere else...",
  },
];

export default function Detail() {
  const { id } = useParams();
  const router = useRouter();

  const article = mockArticles.find((a) => a.id === id);
  if (!article) return <Empty>기사 없음</Empty>;

  return (
    <Container>
      <Header keyword={article.keyword} />

      <ArticleImage src={article.thumbnail_url} alt="썸네일" />
      <Source>{article.source}</Source>
      <Title>{article.title}</Title>
      <Date>{article.date}</Date>
      <Content>{article.content}</Content>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px 16px;
  background-color: #fff;
`;

const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const Source = styled.div`
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--neutral-color-100);
  background-color: var(--primary-color-400);
  border-radius: 12px;
  margin-bottom: 8px;
`;


const Title = styled.h2`
  ${Title4}
  color: var(--neutral-color-800);
  margin-bottom: 5px;
`;

const Date = styled.div`
  font-size: 12px;
  color: var(--neutral-color-400);
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--neutral-color-800);
  line-height: 1.6;
`;

const Empty = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #999;
`;
