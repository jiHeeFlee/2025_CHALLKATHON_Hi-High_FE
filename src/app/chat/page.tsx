'use client';

import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';

import instance from '@/auth/axios';

import Header from './components/Header';
import ChatInput from '@/components/input/ChatInput';

import ClientBubble from './components/ClientBubble';
import GptBubble from './components/GptBubble';

// POST
interface SendMessageResponse {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
interface ChatHistoryResponse {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  messages: {
    id: number;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

interface Message {
  isClient: boolean; // rool === 'user'
  text: string; // content
}

export default function Chat() {
  const chatContentRef = useRef<HTMLDivElement>(null);

  // 모든 메세지 이 배열 하나로 관리
  const [messages, setMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  // 최초 렌더링 시 과거 메세지 가져오기
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await instance.get<ChatHistoryResponse>(`/api/chat`);
        const history: Message[] = res.data.messages.map(msg => ({
          isClient: msg.role === 'user',
          text: msg.content
        }));
        setMessages(history);
      } catch (error) {
        console.log('채팅 히스토리 로드 실패 : ', error);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (value: string | null) => {
    if (!value) return;

    // 화면 바로 출력
    setMessages(prev => [...prev, { isClient: true, text: value }]);

    try {
      const response = await instance.post<SendMessageResponse>(
        `/api/chat/messages`,
        { message: value }
      );

      const gptReply = response.data.content;

      setMessages(prev => [...prev, { isClient: false, text: gptReply }]);
      console.log('[POST] 채팅 전송:', value);
      console.log('[GPT 응답] : ', gptReply);
    } catch (error) {
      console.log('[error] 채팅 내용 : ', value);
      console.log('[error] 채팅 타입 : ', typeof value);
      console.error('메세지 전송 실패 : ', error);
    }
  };

  return (
    <Container>
      <Header state_message="테스트 중" />
      <ChattingArea>
        <ChatContentArea ref={chatContentRef}>
          {messages.map((msg, idx) =>
            msg.isClient ? (
              <ClientBubble key={idx} ask_string={msg.text} />
            ) : (
              <GptBubble key={idx} answer_string={msg.text} />
            )
          )}
        </ChatContentArea>
        <ChatInput
          onClick={handleSendMessage}
          onScrollBottom={scrollToBottom}
        />
      </ChattingArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  overflow-y: hidden;
`;

const ChattingArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; // 남은 영역 모두 차지

  overflow: hidden;
`;

const ChatContentArea = styled.div`
  flex: 1;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  overflow-y: scroll;
  scrollbar-width: none; // firefox : 스크롤바 숨김
  -ms-overflow-style: none; // IE, Edge : 스크롤 바 숨김
  &::-webkit-scrollbar {
    display: none; // chrome, safari : 스크롤바 숨김
  }
`;
