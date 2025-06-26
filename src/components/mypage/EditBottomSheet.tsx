'use client';

import React from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@/assets/CloseIcon.svg';
import GlobalButton from '@/components/button/GlobalButton';

interface Props {
  isOpen: boolean;
  currentMenu: string;
  selectedOptions: string[];
  searchValue: string;
  isLoading: boolean;
  onClose: () => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchAdd: () => void;
  onOptionRemove: (option: string) => void;
  onSave: () => void;
}

export default function EditBottomSheet({
  isOpen,
  currentMenu,
  selectedOptions,
  searchValue,
  isLoading,
  onClose,
  onSearchChange,
  onSearchAdd,
  onOptionRemove,
  onSave
}: Props) {
  if (!isOpen) return null;

  return (
    <BottomSheetOverlay onClick={onClose}>
      <BottomSheet onClick={e => e.stopPropagation()}>
        <BottomSheetHeader>
          <span>{currentMenu} 수정하기</span>
          <CloseButton onClick={onClose}>×</CloseButton>
        </BottomSheetHeader>{' '}
        <BottomSheetContent>
          {' '}
          <SearchSection>
            <SearchInput
              type="text"
              value={searchValue}
              placeholder={`${currentMenu}를 입력해주세요`}
              onChange={onSearchChange}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  onSearchAdd();
                }
              }}
            />
          </SearchSection>
          <OptionContainer>
            {selectedOptions.map((option, index) => (
              <Option key={index}>
                {option}
                <CloseIcon
                  className="svg"
                  onClick={() => onOptionRemove(option)}
                />
              </Option>
            ))}
          </OptionContainer>{' '}
          <SaveButtonContainer>
            <GlobalButton onClick={onSave} disabled={isLoading}>
              {isLoading ? '저장 중...' : '수정 완료'}
            </GlobalButton>
          </SaveButtonContainer>
        </BottomSheetContent>
      </BottomSheet>
    </BottomSheetOverlay>
  );
}

const BottomSheetOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 526px;
  border-radius: 20px 20px 0px 0px;
  background: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 28px 22px;

  span {
    color: var(--neutral-color-800);
    font-size: 18px;
    font-weight: 500;
    line-height: 26px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: var(--neutral-color-400);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomSheetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 28px 28px;
`;

const SearchSection = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  display: flex;
  width: 319px;
  height: 44px;
  padding: 0px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 20px;
  background: var(--neutral-color-100);
  color: var(--neutral-color-500);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  border: none;
  outline: none;

  &::placeholder {
    color: var(--neutral-color-400);
  }

  &:hover {
    opacity: 0.75;
    background: var(--neutral-color-200);
    color: var(--neutral-color-500);
  }
  &:active {
    background: var(--neutral-color-200);
    color: var(--neutral-color-500, #7a89a5);
  }
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 1rem;
`;

const Option = styled.div`
  display: flex;
  width: fit-content;
  height: 32px;
  padding: 4px 12px;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 14px;
  border: 0.4px solid var(--primary-color-300);
  background: #fff;
  color: var(--primary-color-300);
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;

  &:hover {
    border: 0.4px solid var(--primary-color-600);
    color: var(--primary-color-600);

    .svg {
      filter: brightness(0) saturate(100%) invert(19%) sepia(87%)
        saturate(6491%) hue-rotate(202deg) brightness(97%) contrast(93%);
    }
  }

  &:active {
    border: 0.4px solid var(--neutral-color-100);
    background: var(--primary-color-500);
    color: var(--neutral-color-100, #f3f4f6);

    .svg {
      filter: brightness(0) saturate(100%) invert(96%) sepia(4%) saturate(224%)
        hue-rotate(202deg) brightness(102%) contrast(95%);
    }
  }
  .svg {
    width: 12px;
    height: 12px;
    cursor: pointer;
    transition: filter 0.2s ease;
  }
`;

const SaveButtonContainer = styled.div`
  position: fixed;
  bottom: 58px;
  left: 50%;
  transform: translateX(-50%);
  width: 319px;
`;
