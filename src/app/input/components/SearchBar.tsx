import styled from '@emotion/styled'

interface Props {
  value: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEnter: () => void 
}


export default function SearchBar({ value, placeholder, onChange, onEnter }: Props) {
  return (
    <Container>
      <Icon src="/assets/images/SearchIcon.svg" alt="search" />
      <Input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') onEnter()
        }}
      />

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 20px;
  width: 319px;
  height: 44px;
  padding: 12px 16px;
  margin: 0 auto;
  gap: 12px;
  box-shadow: 0px 0px 20px 0px rgba(26, 150, 254, 1);
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: var(--neutral-color-500);
`
