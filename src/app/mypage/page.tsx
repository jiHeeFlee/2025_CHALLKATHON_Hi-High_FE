'use client';

import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { Cookies } from 'react-cookie';

import NavigationBar from '../home/components/NavigationBar';
import BackIcon from '@/assets/BackIcon.svg';
import GlobalButton from '@/components/button/GlobalButton';
import instance from '@/auth/axios';
import ProfileSection from '../../components/mypage/ProfileSection';
import MenuSection from '../../components/mypage/MenuSection';
import EditBottomSheet from '../../components/mypage/EditBottomSheet';

export default function Mypage() {
  const router = useRouter();

  const [profileUpdate, setProfileUpdate] = React.useState(false);
  const [nickname, setNickname] = React.useState('');
  const [tempNickname, setTempNickname] = React.useState('');
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const [currentMenu, setCurrentMenu] = React.useState('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [interests, setInterests] = React.useState<string[]>([]);
  const [goals, setGoals] = React.useState<string[]>([]);
  const [jobTypes, setJobTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await instance.get('/api/auth/user-info');
        const userData = response.data;

        setNickname(userData.name || '');
        setTempNickname(userData.name || '');
        setInterests(
          userData.interests
            ? userData.interests
                .split(', ')
                .filter((item: string) => item.trim())
            : []
        );
        setGoals(
          userData.goals
            ? userData.goals.split(', ').filter((item: string) => item.trim())
            : []
        );
        setJobTypes(
          userData.desiredOccupation
            ? userData.desiredOccupation
                .split(', ')
                .filter((item: string) => item.trim())
            : []
        );
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, []);
  const handleProfileUpdate = () => {
    setProfileUpdate(!profileUpdate);
    setTempNickname(nickname);
  };
  const handleProfileSave = () => {
    setNickname(tempNickname);
    setProfileUpdate(false);
  };
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempNickname(e.target.value);
  };
  const handleLogout = () => {
    try {
      if (typeof window !== 'undefined') {
        // localStorage에서 토큰 제거
        localStorage.removeItem('token');

        // cookies에서도 토큰 제거 (혹시 있다면)
        const cookies = new Cookies();
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });

        router.push('/');
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 일단 토큰은 제거하고 이동
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        router.push('/');
      }
    }
  };
  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        '정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'
      )
    ) {
      return;
    }

    try {
      await instance.delete('/api/auth/account');
      // 토큰 제거
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');

        // cookies에서도 토큰 제거
        const cookies = new Cookies();
        cookies.remove('accessToken', { path: '/' });
        cookies.remove('refreshToken', { path: '/' });

        alert('계정이 삭제되었습니다.');
        router.push('/');
      }
    } catch (error) {
      console.error('계정 삭제 실패:', error);
      alert('계정 삭제에 실패했습니다. 다시 시도해주세요.');
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
  const handleOptionRemove = async (option: string) => {
    const updatedOptions = selectedOptions.filter(item => item !== option);
    setSelectedOptions(updatedOptions);

    switch (currentMenu) {
      case '관심사':
        setInterests(updatedOptions);
        break;
      case '목표':
        setGoals(updatedOptions);
        break;
      case '희망직종':
        setJobTypes(updatedOptions);
        break;
    }

    try {
      const joinedOptions = updatedOptions.join(', ');

      switch (currentMenu) {
        case '관심사':
          await instance.put('/api/auth/interests', {
            interests: joinedOptions
          });
          break;
        case '목표':
          await instance.put('/api/auth/goals', { goals: joinedOptions });
          break;
        case '희망직종':
          await instance.put('/api/auth/desired-occupation', {
            desiredOccupation: joinedOptions
          });
          break;
      }

      console.log(`${currentMenu}에서 "${option}" 삭제 성공`);
    } catch (error) {
      console.error(`${currentMenu}에서 "${option}" 삭제 실패:`, error);
      // 실패 시 원래 상태로 되돌리기
      setSelectedOptions(selectedOptions);
      switch (currentMenu) {
        case '관심사':
          setInterests(interests);
          break;
        case '목표':
          setGoals(goals);
          break;
        case '희망직종':
          setJobTypes(jobTypes);
          break;
      }
      alert(`"${option}" 삭제에 실패했습니다. 다시 시도해주세요.`);
    }
  };
  const handleSaveOptions = async () => {
    setIsLoading(true);
    try {
      const joinedOptions = selectedOptions.join(', ');

      switch (currentMenu) {
        case '관심사':
          setInterests([...selectedOptions]);
          await instance.put('/api/auth/interests', {
            interests: joinedOptions
          });
          break;
        case '목표':
          setGoals([...selectedOptions]);
          await instance.put('/api/auth/goals', { goals: joinedOptions });
          break;
        case '희망직종':
          setJobTypes([...selectedOptions]);
          await instance.put('/api/auth/desired-occupation', {
            desiredOccupation: joinedOptions
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
        <GlobalButton onClick={handleLogout}>로그아웃</GlobalButton>
        <DeleteAccount onClick={handleDeleteAccount}>
          계정 삭제하기
        </DeleteAccount>
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
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100vh;
  overflow-y: auto;

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
