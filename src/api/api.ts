import ky from 'ky';

// API 기본 설정
const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [
      request => {
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        // 401 에러시 로그아웃 처리
        if (response.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return response;
      }
    ]
  }
});

export interface UserInfo {
  id: number;
  loginId: string;
  userRole: string;
  name: string;
  gender: string;
  birthYear: string;
  isPrivateInformAgreed: boolean;
  provider: string;
  providerId: string;
  interests: string;
  goals: string;
  desiredOccupation: string;
}

// 마이페이지 API 함수들
export const mypageAPI = {
  // 사용자 정보 조회
  getUserInfo: async (): Promise<UserInfo> => {
    try {
      const response = await api.get('api/auth/user-info').json<UserInfo>();
      return response;
    } catch (error) {
      console.error('사용자 정보 불러오기 실패:', error);
      throw error;
    }
  },

  // 관심사 업데이트
  updateInterests: async (interests: string): Promise<void> => {
    try {
      await api.put('api/auth/interests', {
        json: { interests }
      });
      console.log('관심사 업데이트 성공');
    } catch (error) {
      console.error('관심사 업데이트 실패:', error);
      throw error;
    }
  },

  // 목표 업데이트
  updateGoals: async (goals: string): Promise<void> => {
    try {
      await api.put('api/auth/goals', {
        json: { goals }
      });
      console.log('목표 업데이트 성공');
    } catch (error) {
      console.error('목표 업데이트 실패:', error);
      throw error;
    }
  },

  // 희망직종 업데이트
  updateDesiredOccupation: async (desiredOccupation: string): Promise<void> => {
    try {
      await api.put('api/auth/desired-occupation', {
        json: { desiredOccupation }
      });
      console.log('희망직종 업데이트 성공');
    } catch (error) {
      console.error('희망직종 업데이트 실패:', error);
      throw error;
    }
  },

  // 관심사 삭제
  deleteInterests: async (): Promise<void> => {
    try {
      await api.delete('api/auth/interests');
      console.log('관심사 삭제 성공');
    } catch (error) {
      console.error('관심사 삭제 실패:', error);
      throw error;
    }
  },

  // 목표 삭제
  deleteGoals: async (): Promise<void> => {
    try {
      await api.delete('api/auth/goals');
      console.log('목표 삭제 성공');
    } catch (error) {
      console.error('목표 삭제 실패:', error);
      throw error;
    }
  },

  // 희망직종 삭제
  deleteDesiredOccupation: async (): Promise<void> => {
    try {
      await api.delete('api/auth/desired-occupation');
      console.log('희망직종 삭제 성공');
    } catch (error) {
      console.error('희망직종 삭제 실패:', error);
      throw error;
    }
  },

  // 계정 삭제
  deleteAccount: async (): Promise<void> => {
    try {
      await api.delete('api/auth/account');
      console.log('계정 삭제 성공');
    } catch (error) {
      console.error('계정 삭제 실패:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/start';
      }
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  }
};

export default api;
