'use client'

import { useRouter } from 'next/navigation'
import styled from '@emotion/styled'
import { useState } from 'react'
import AuthButton from '@/components/button/AuthButton'
import { Title2, Body4 } from '@/app/typography'

export default function StartPage() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleStart = () => {
  router.push('/home')
  }



  return (
    <Container>
      <Content>
        <Title>
          {name || '{유저이름}'}님의 <br />
          <Highlight>하이</Highlight>를 시작해볼까요?
        </Title>
        <Subtitle>나만을 위한 정보가 만들어지고 있어요!</Subtitle>

        <Logo src="/assets/images/HAI_Logo.svg" alt="HAI logo" />

        <StartButton content="시작하기" onClick={handleStart} />
      </Content>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #ffffff;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
`

const Title = styled.span`
  ${Title2}
  color: var(--neutral-color-800);
`

const Highlight = styled.span`
  ${Title2}
  color: var(--primary-color-600);
`

const Subtitle = styled.p`
  ${Body4}
  color: var(--neutral-color-500);
  padding-top: 0.5rem;
`

const Logo = styled.img`
  width: 256px;
  height: 157px;
  margin-top: 120px;
`


const StartButton = styled(AuthButton)`
  color: #ffffff;
  background-color: var(--primary-color-500);
  border-radius: 20px;
  position: absolute;
  bottom: 5rem;
  border: none;


  &:hover {
    background-color: var(--primary-color-600);
    transition: all 0.2s ease-in-out;
  }

  &:active {
    background-color: var(--primary-color-800);
    transition: all 0.2s ease-in-out;
  }
`;
