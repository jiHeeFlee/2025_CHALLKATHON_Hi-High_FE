'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import Header from './components/Header';
import ChatInput from '@/components/input/ChatInput';

import ClientBubble from './components/ClientBubble';
import GptBubble from './components/GptBubble';

const mock = {
  client: ['테스트 01', '테스트 02'],
  gpt: ['## 이게 될까?', '# 이게 되네']
};

export default function Chat() {
  return (
    <Container>
      <Header state_message="테스트 중" />
      <ChattingArea>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            gap: '1rem'
          }}
        >
          <ClientBubble ask_string={mock.client[0]} />
          <GptBubble answer_string={mock.gpt[0]} />
          <ClientBubble ask_string={mock.client[1]} />
          <GptBubble answer_string={mock.gpt[1]} />
        </div>
        <ChatInput />
      </ChattingArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
`;

const ChattingArea = styled.div`
  /* height: 100%; */
`;
