'use client';

import React from 'react';
import styled from '@emotion/styled';

interface Props {
  nickname: string;
  tempNickname: string;
  profileUpdate: boolean;
  onProfileUpdate: () => void;
  onProfileSave: () => void;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileSection({
  nickname,
  tempNickname,
  profileUpdate,
  onProfileUpdate,
  onProfileSave,
  onNicknameChange
}: Props) {
  return (
    <ProfileContainer>
      <ProfileImage
        src="https://avatars.githubusercontent.com/u/12345678?v=4"
        alt="프로필 이미지"
      />
      <ProfileNameContainer>
        {profileUpdate ? (
          <NicknameInput
            type="text"
            value={tempNickname}
            onChange={onNicknameChange}
            maxLength={20}
          />
        ) : (
          nickname
        )}
        {profileUpdate ? (
          <ProfileSaveBtn onClick={onProfileSave}>저장하기</ProfileSaveBtn>
        ) : (
          <ProfileUpdateButton onClick={onProfileUpdate}>
            수정하기
          </ProfileUpdateButton>
        )}
      </ProfileNameContainer>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

const ProfileImage = styled.img`
  width: 98px;
  height: 98px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--neutral-color-700);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

const ProfileUpdateButton = styled.div`
  color: var(--primary-color-500);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
`;

const ProfileSaveBtn = styled.div`
  display: flex;
  width: 75px;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: var(--primary-color-300);
  color: var(--neutral-color-100);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
`;

const NicknameInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: var(--neutral-color-700);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  border-bottom: 1px solid var(--primary-color-300);
  padding: 2px 8px;
  margin-bottom: 4px;
`;
