import styled from '@emotion/styled'

interface Props {
  keywords: string[]
  onRemove: (item: string) => void
}

export default function KeywordTagList({ keywords, onRemove }: Props) {
  return (
    <Container>
      {keywords.map((kw, i) => (
        <Tag key={i}>
          {kw}
          <CloseBtn onClick={() => onRemove(kw)}>
            <Icon src="/assets/images/CloseIcon.svg" alt="remove" />
          </CloseBtn>
        </Tag>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  gap: 8px;
`

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  height: 32px;
  border-radius: 14px;
  border: 0.4px solid var(--primary-color-500);
  background: #ffffff;
  color: var(--primary-color-500);
  font-size: 14px;
`

const CloseBtn = styled.button`
  background: none;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
`

const Icon = styled.img`
  width: 12px;
  height: 12px;
`