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

// 로그인 API
export interface LoginCredentials {
  id: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  message?: string;
}

// 회원가입 API
export interface SignupCredentials {
  id: string;
  password: string;
  name: string;
  profileImage?: File;
}

export interface SignupResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
  };
  message?: string;
}

// GET 회원 정보
export interface GetProfileResponse extends SignupCredentials {}

export const authAPI = {
  // 로그인
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api
        .post('로그인 API 주소', {
          json: credentials
        })
        .json<LoginResponse>();

      // 토큰 저장
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: async (): Promise<void> => {
    try {
      await api.post('로그아웃 API 주소소');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },
  // 회원가입
  signup: async (credentials: SignupCredentials): Promise<SignupResponse> => {
    try {
      const formData = new FormData();
      formData.append('id', credentials.id);
      formData.append('password', credentials.password);
      formData.append('name', credentials.name);

      if (credentials.profileImage) {
        formData.append('profileImage', credentials.profileImage);
      }

      const response = await api
        .post('회원가입 API 주소', {
          body: formData
        })
        .json<SignupResponse>();

      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // 사용자 정보 조회
  getProfile: async () => {
    return api.get('프로필 조회 주소').json<GetProfileResponse>();
  },

  // ID 중복 확인
  checkIdAvailability: async (
    id: string
  ): Promise<{ available: boolean; message?: string }> => {
    try {
      const response = await api
        .get(`ID 중복 확인 API 주소`)
        .json<{ available: boolean; message?: string }>();
      return response;
    } catch (error) {
      console.error('ID check error:', error);
      throw error;
    }
  }
};

export default api;
