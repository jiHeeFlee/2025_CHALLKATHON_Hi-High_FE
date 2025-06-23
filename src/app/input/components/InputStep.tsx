'use client'

import { useState } from 'react'
import styled from '@emotion/styled'
import LineBar from '@/components/status/LineBar'
import AuthButton from '@/components/button/AuthButton'
import { Title2, Body4 } from '@/app/typography'
import SearchBar from '@/app/input/components/SearchBar'
import Keyword from '@/app/input/components/Keyword'

interface Props {
  title: string
  highlight: string
  subtitle: string
  placeholder: string
  currentStep: number
  totalStep: number
  onNext: (keywords: string[]) => void
}

export default function InputStep({
  title,
  highlight,
  subtitle,
  placeholder,
  currentStep,
  totalStep,
  onNext,
}: Props) {
  const [inputs, setInputs] = useState<string[]>([])
  const [value, setValue] = useState('')

  const handleAdd = (input: string) => {
  const trimmed = input.trim()
  if (!trimmed || inputs.includes(trimmed)) return
  setInputs([...inputs, trimmed])
  setValue('')
}


  const handleRemove = (item: string) => {
    setInputs(inputs.filter((i) => i !== item))
  }

  const handleNext = () => {
    onNext(inputs)
  }

  return (
    <Container>
      <LineBarSection>
        <LineBar total={totalStep} current={currentStep} />
      </LineBarSection>

      <TitleSection>
        <Title>
          {title} <br />
          <Highlight>{highlight}</Highlight>은 무엇인가요?
        </Title>
        <Subtitle>{subtitle}</Subtitle>
      </TitleSection>

      <SearchSection>
        <SearchBar
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onEnter={() => handleAdd(value)}
        />
      </SearchSection>


      <KeywordSection>
        <Keyword keywords={inputs} onRemove={handleRemove} />
      </KeywordSection>

      <NextButton content="다음" onClick={handleNext} />
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

const LineBarSection = styled.div`
  position: absolute;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
`

const TitleSection = styled.div`
  margin-top: 8rem;
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

const SearchSection = styled.div`
  margin-top: 5rem;
  width: 100%;
`

const KeywordSection = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: flex-start; 
  flex-wrap: wrap;
  padding: 0 1rem; 
`

const NextButton = styled(AuthButton)`
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
`
