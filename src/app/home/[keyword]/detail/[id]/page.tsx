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
        console.log('🔍 상세정보 API 호출 시작');
        console.log('요청 URL:', `/api/career-news/${id}`);
        console.log('기사 ID:', id);

        const response = await instance.get(`/api/career-news/${id}`);

        console.log('🔍 상세정보 API 응답:');
        console.log('전체 응답:', response);
        console.log('응답 데이터:', response.data);
        console.log('데이터 키들:', Object.keys(response.data || {}));
        if (response.data) {
          console.log('📄 기사 상세 정보:');
          console.log('제목:', response.data.title);
          console.log('내용:', response.data.content);
          console.log('번역된 내용:', response.data.translatedContent);
          console.log('요약:', response.data.summary);
          console.log('본문:', response.data.article);
          console.log('설명:', response.data.description);
          console.log('키워드:', response.data.keywords);
          console.log('소스:', response.data.source);
          console.log('썸네일:', response.data.thumbnailUrl);
          console.log('발행일:', response.data.publishedDate);
          console.log('원문 링크:', response.data.sourceUrl);
          console.log('🔍 모든 응답 키들:', Object.keys(response.data));

          setArticle(response.data);
        } else {
          console.log('❌ 응답 데이터가 없습니다');
          setArticle(null);
        }
      } catch (error: any) {
        console.error('❌ 기사 상세 정보 가져오기 실패:', error);
        console.log('에러 응답:', error.response?.data);
        console.log('에러 상태:', error.response?.status);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetail();
    }
  }, [id]);

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
      {' '}
      <DetailHeader>
        <StyledBackIcon onClick={() => router.back()} />
        <HeaderTitle>{decodeURIComponent(keyword as string)}</HeaderTitle>
      </DetailHeader>
      <ArticleImage
        src={article.thumbnailUrl || 'https://via.placeholder.com/400x200'}
        alt="썸네일"
      />
      <Source>{article.source}</Source>
      <Title dangerouslySetInnerHTML={{ __html: article.title || '' }} />{' '}
      <Date>
        {article.publishedDate ? article.publishedDate.split('T')[0] : ''}
      </Date>{' '}
      <Content>
        {/* 우선순위: translatedContent > summary > content > article > description */}
        {article.translatedContent && article.translatedContent.length > 100
          ? article.translatedContent
          : article.summary ||
            article.content ||
            article.article ||
            article.description ||
            '기사 내용이 없습니다.'}
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
  /* min-height: 100vh; */
  max-height: 812px;

  overflow-y: scroll;
  overflow-y: scroll;
  scrollbar-width: none; // firefox : 스크롤바 숨김
  -ms-overflow-style: none; // IE, Edge : 스크롤 바 숨김
  &::-webkit-scrollbar {
    display: none; // chrome, safari : 스크롤바 숨김
  }
`;

const DetailHeader = styled.div`
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
  margin-bottom: 40px;

  &:hover {
    background-color: var(--primary-color-600);
  }
`;

const Empty = styled.div`
  padding: 80px 20px;
  text-align: center;
  color: #999;
`;
