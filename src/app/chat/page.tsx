'use client';

import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';

import Header from './components/Header';
import ChatInput from '@/components/input/ChatInput';

import ClientBubble from './components/ClientBubble';
import GptBubble from './components/GptBubble';

export default function Chat() {
  const chatContentRef = useRef<HTMLDivElement>(null);

  const [clientMessages, setClientMessages] = useState<string[]>([
    '테스트 01',
    '테스트 02-긴버전'
  ]);
  const [gptMessages] = useState<string[]>(['## 이게 될까?', '# 이게 되네']);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [clientMessages, gptMessages]);

  const handleSendMessage = (value: string | null) => {
    if (!value) return;
    setClientMessages(prev => [...prev, value]);
  };

  return (
    <Container>
      <Header state_message="테스트 중" />
      <ChattingArea>
        <ChatContentArea ref={chatContentRef}>
          {gptMessages.map((item, index) => (
            <GptBubble key={index} answer_string={item} />
          ))}
          {clientMessages.map((item, index) => (
            <ClientBubble key={index} ask_string={item} />
          ))}
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
