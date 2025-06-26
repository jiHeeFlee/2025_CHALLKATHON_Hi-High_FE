'use client';

import styled from '@emotion/styled';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Title4 } from '@/app/typography';
import instance from '@/auth/axios';
import BackIcon from '@/assets/BackIcon.svg';

export default function Detail() {
  const { id, keyword } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        const response = await instance.get('/api/main');

        // URL 키워드 디코딩
        const decodedKeyword = decodeURIComponent(keyword as string);

        console.log('🔍 상세페이지 디버깅');
        console.log('URL keyword (원본):', keyword);
        console.log('URL keyword (디코딩):', decodedKeyword);
        console.log('URL id:', id);
        console.log(
          'newsByKeyword 키들:',
          Object.keys(response.data?.newsByKeyword || {})
        );

        // 해당 키워드의 뉴스 중에서 해당 ID의 기사 찾기
        const keywordNews = response.data?.newsByKeyword?.[decodedKeyword];
        console.log(`"${decodedKeyword}" 키워드의 뉴스:`, keywordNews);

        if (keywordNews && Array.isArray(keywordNews)) {
          console.log('뉴스 리스트:');
          keywordNews.forEach((news: any, index: number) => {
            console.log(
              `  ${index}: ID=${news.id} (${typeof news.id}), 제목="${news.title}"`
            );
          });

          // ID 비교 (문자열과 숫자 모두 시도)
          let foundArticle = keywordNews.find(
            (news: any) => news.id.toString() === id
          );
          if (!foundArticle) {
            foundArticle = keywordNews.find(
              (news: any) => news.id === parseInt(id as string)
            );
          }
          if (!foundArticle) {
            foundArticle = keywordNews.find((news: any) => news.id === id);
          }

          console.log('찾은 기사:', foundArticle ? foundArticle.title : '없음');
          setArticle(foundArticle);
        } else {
          console.log('키워드에 해당하는 뉴스가 없음');
          setArticle(null);
        }
      } catch (error: any) {
        console.error('기사 상세 정보 가져오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id && keyword) {
      fetchArticleDetail();
    }
  }, [id, keyword]);

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
          기사를 불러오는 중...
        </div>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container>
        <Empty>기사를 찾을 수 없습니다.</Empty>
      </Container>
    );
  }
  return (
    <Container>
      {' '}      <DetailHeader>
        <StyledBackIcon onClick={() => router.back()} />
        <HeaderTitle>{decodeURIComponent(keyword as string)}</HeaderTitle>
      </DetailHeader>
      <ArticleImage
        src={article.thumbnailUrl || 'https://via.placeholder.com/400x200'}
        alt="썸네일"
      />
      <Source>{article.source}</Source>
      <Title dangerouslySetInnerHTML={{ __html: article.title || '' }} />
      <Date>
        {article.publishedDate ? article.publishedDate.split('T')[0] : ''}
      </Date>{' '}
      <Content>
        {article.translatedContent && article.translatedContent.length > 100
          ? article.translatedContent
          : article.summary || '기사 내용이 없습니다.'}
      </Content>
      {article.sourceUrl && (
        <SourceLink
          href={article.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          원문 보기
        </SourceLink>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 40px 16px 24px 16px;
  background-color: #fff;
  min-height: 100vh;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;
  padding: 12px 0;
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
  font-size: 18px;
  font-weight: 600;
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

const AnalysisReason = styled.div`
  padding: 12px;
  background-color: #f8f9fa;
  border-left: 4px solid var(--primary-color-500);
  border-radius: 4px;
  font-size: 14px;
  color: var(--neutral-color-700);
  margin-bottom: 16px;
  line-height: 1.5;
`;

const Keywords = styled.div`
  font-size: 12px;
  color: var(--neutral-color-500);
  margin-bottom: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

const Content = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--neutral-color-800);
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const SourceLink = styled.a`
  display: inline-block;
  padding: 8px 16px;
  background-color: var(--primary-color-500);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background-color: var(--primary-color-600);
  }
`;

const Empty = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #999;
`;
