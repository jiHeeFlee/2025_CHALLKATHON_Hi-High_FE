'use client';

import React from 'react';
import styled from '@emotion/styled';
import Heart from '@/assets/Heart.svg';
import Document from '@/assets/document-text.svg';
import Profile from '@/assets/profile-circle.svg';
import NextIcon from '@/assets/arrow-right.svg';

interface Props {
  onMenuClick: (menuType: string) => void;
}

export default function MenuSection({ onMenuClick }: Props) {
  return (
    <MenuBoxContainer>
      <MenuContainer onClick={() => onMenuClick('관심사')}>
        <MenuTitleContainer>
          <Heart className="svg" />
          관심사 수정하기
        </MenuTitleContainer>
        <NextIcon className="svg" />
      </MenuContainer>
      <MenuContainer onClick={() => onMenuClick('목표')}>
        <MenuTitleContainer>
          <Document className="svg" />
          목표 수정하기
        </MenuTitleContainer>
        <NextIcon className="svg" />
      </MenuContainer>
      <MenuContainer onClick={() => onMenuClick('희망직종')}>
        <MenuTitleContainer>
          <Profile className="svg" />
          희망 직종 수정하기
        </MenuTitleContainer>
        <NextIcon className="svg" />
      </MenuContainer>
    </MenuBoxContainer>
  );
}

const MenuBoxContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-top: 38px;
`;

const MenuContainer = styled.div`
  display: flex;
  width: 319px;
  height: 52px;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  color: var(--neutral-color-700);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  border-radius: 20px;
  background: var(--neutral-color-10);
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    color: var(--neutral-color-400);
    filter: brightness(0) saturate(100%) invert(64%) sepia(8%) saturate(318%)
      hue-rotate(202deg) brightness(95%) contrast(87%);
  }

  &:hover {
    background: var(--Colors-Primary-Alpha-10, rgba(1, 110, 202, 0.1));
    color: var(--primary-color-700, #016eca);

    svg {
      color: var(--primary-color-700, #016eca);
      filter: brightness(0) saturate(100%) invert(28%) sepia(85%)
        saturate(2076%) hue-rotate(197deg) brightness(94%) contrast(101%);
    }
  }

  &:active {
    background: var(--primary-color-500, #1a96fe);
    color: var(--neutral-color-100, #f3f4f6);

    svg {
      color: var(--neutral-color-100, #f3f4f6);
      filter: brightness(0) saturate(100%) invert(100%);
    }
  }
`;

const MenuTitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;
