'use client';

import styled from '@emotion/styled';
import { Title1, Title3, Caption1 } from '@/app/typography';

import WhiteLogo from '@/assets/whiteLogo.svg';

export default function Header() {
  return (
    <Container>
      <StyledLogo>
        <WhiteLogo />
      </StyledLogo>
      <TitleWrapper>
        <NameWrapper>
          <UserName>승민</UserName>
          <Message>님</Message>
        </NameWrapper>
        <Message>요즘 이런 이야기들이 있어요</Message>
      </TitleWrapper>
      <Date>2025.06.23 21시 기준</Date>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 20.75rem;
  flex-shrink: 0;

  justify-content: space-between;

  padding: 28px 43px;
  gap: 83px;

  border-radius: 0rem 0rem 1.875rem 1.875rem;
  color: #fff;
  background: linear-gradient(
    180deg,
    var(--Colors-Secondary-400, #60caf9) 0%,
    var(--Colors-Primary-600, #0183f0) 100%
  );
`;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: first baseline;
`;

const UserName = styled.span`
  ${Title1}
`;
const Message = styled.span`
  ${Title3}
`;
const Date = styled.span`
  ${Caption1}
`;
