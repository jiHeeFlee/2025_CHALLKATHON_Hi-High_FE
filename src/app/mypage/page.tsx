'use client';

import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

import NavigationBar from '../home/components/NavigationBar';
import BackIcon from '@/assets/BackIcon.svg';
import GlobalButton from '@/components/button/GlobalButton';
import { userInfoAPI, authAPI } from '@/api/api';
import ProfileSection from '../../components/mypage/ProfileSection';
import MenuSection from '../../components/mypage/MenuSection';
import EditBottomSheet from '../../components/mypage/EditBottomSheet';

export default function Mypage() {
  const router = useRouter();

  const [profileUpdate, setProfileUpdate] = React.useState(false);
  const [nickname, setNickname] = React.useState('유저 닉네임');
  const [tempNickname, setTempNickname] = React.useState('유저 닉네임');
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [currentMenu, setCurrentMenu] = React.useState('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [interests, setInterests] = React.useState<string[]>([
    '개발',
    '디자인'
  ]);
  const [goals, setGoals] = React.useState<string[]>(['취업', '스킬업']);
  const [jobTypes, setJobTypes] = React.useState<string[]>([
    '프론트엔드 개발자'
  ]);

  const handleProfileUpdate = () => {
    setProfileUpdate(!profileUpdate);
    setTempNickname(nickname);
    console.log('프로필 수정 클릭됨');
  };

  const handleProfileSave = () => {
    setNickname(tempNickname);
    setProfileUpdate(false);
    console.log('프로필 저장됨:', tempNickname);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };
  const handleMenuClick = (menuType: string) => {
    setCurrentMenu(menuType);
    setBottomSheetOpen(true);
    switch (menuType) {
      case '관심사':
        setSelectedOptions([...interests]);
        break;
      case '목표':
        setSelectedOptions([...goals]);
        break;
      case '희망직종':
        setSelectedOptions([...jobTypes]);
        break;
    }
  };
  const handleBottomSheetClose = () => {
    setBottomSheetOpen(false);
    setCurrentMenu('');
    setSelectedOptions([]);
    setSearchValue('');
  };
  const handleSearchAdd = () => {
    const trimmed = searchValue.trim();
    if (!trimmed || selectedOptions.includes(trimmed)) return;
    setSelectedOptions([...selectedOptions, trimmed]);
    setSearchValue('');
  };

  const handleOptionRemove = (option: string) => {
    setSelectedOptions(selectedOptions.filter(item => item !== option));
  };
  const handleSaveOptions = async () => {
    setIsLoading(true);

    try {
      switch (currentMenu) {
        case '관심사':
          setInterests([...selectedOptions]);
          await userInfoAPI.updateInterests({
            interests: selectedOptions.join(', ')
          });
          break;
        case '목표':
          setGoals([...selectedOptions]);
          await userInfoAPI.updateGoals({
            goals: selectedOptions.join(', ')
          });
          break;
        case '희망직종':
          setJobTypes([...selectedOptions]);
          await userInfoAPI.updateDesiredOccupation({
            desiredOccupation: selectedOptions.join(', ')
          });
          break;
      }

      console.log(`${currentMenu} 업데이트 성공:`, selectedOptions);
      handleBottomSheetClose();
    } catch (error) {
      console.error(`${currentMenu} 업데이트 실패:`, error);
      alert(`${currentMenu} 업데이트에 실패했습니다. 다시 시도해주세요.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* {' '} */}
      <Title>
        <StyledBackIcon onClick={() => router.back()} />
        마이페이지
      </Title>
      <ProfileSection
        nickname={nickname}
        tempNickname={tempNickname}
        profileUpdate={profileUpdate}
        onProfileUpdate={handleProfileUpdate}
        onProfileSave={handleProfileSave}
        onNicknameChange={handleNicknameChange}
      />
      <MenuSection onMenuClick={handleMenuClick} />
      <ButtonWrapper>
        <GlobalButton
          // style={{ marginTop: '172px' }}
          onClick={handleLogout}
        >
          로그아웃
        </GlobalButton>
        <DeleteAccount>계정 삭제하기</DeleteAccount>
      </ButtonWrapper>
      <EditBottomSheet
        isOpen={bottomSheetOpen}
        currentMenu={currentMenu}
        selectedOptions={selectedOptions}
        searchValue={searchValue}
        isLoading={isLoading}
        onClose={handleBottomSheetClose}
        onSearchChange={e => setSearchValue(e.target.value)}
        onSearchAdd={handleSearchAdd}
        onOptionRemove={handleOptionRemove}
        onSave={handleSaveOptions}
      />
      <NavigationBar />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  overflow: hidden;

  background-color: #fff;

  position: relative;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: var(--neutral-color-700);
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: 24px;

  position: relative;
  .svg {
    width: 28px;
    height: 28px;
  }
`;

const StyledBackIcon = styled(BackIcon)`
  position: absolute;
  left: 2rem;
  color: var(--neutral-color-300);

  :hover {
    color: var(--neutral-color-500);
    transition: all 0.2s ease-in-out;
  }

  :active {
    color: var(--primary-color-500);
    transition: all 0.2s ease-in-out;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  outline: none;
`;

const DeleteAccount = styled.div`
  color: var(--neutral-color-400);
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-top: 20px;
  margin-bottom: 24px;
  cursor: pointer;
`;
