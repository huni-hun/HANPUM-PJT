import { SignupRequestValues } from '@/models/signup';
import api from '../index';

// 아이디 중복확인
export async function CheckId(loginId: string) {
  const { data } = await api.post('/api/auth/login-id/check', {
    loginId: loginId,
  });

  return data;
}

// 이메일 인증번호 전송
export async function CheckEmail(email: string) {
  const { data } = await api.post('/api/auth/email-auth', {
    email,
  });
  return data;
}

// 이메일 인증
export async function CertificationEmail(email: string, inputAuthCode: string) {
  const { data } = await api.post('/api/auth/email-auth/check', {
    email,
    inputAuthCode: inputAuthCode,
  });
  return data;
}

// 닉네임 중복 확인
export async function CheckNickname(nickname: string) {
  const { data } = await api.post('/api/auth/nickname/check', {
    nickname,
  });
  return data;
}

// 회원가입
export async function SignUp(signupReq: SignupRequestValues) {
  console.log(signupReq.multipartFile);
  const formData = new FormData();

  Object.entries(signupReq).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.forEach((value, key) => {
    console.log(key, value);
  });

  const { data } = await api.post('/api/auth/sign-up', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// 로그인
export async function Login(loginId: string, password: string) {
  const { data } = await api.post('/api/auth/login', {
    loginId,
    password,
  });
  return data;
}

// 로그아웃 TODO
export async function Logout() {
  const { data } = await api.post('/api/auth/logout');
  return data;
}

// 토큰 재발급 TODO
export async function GetRefreshToken() {
  const { data } = await api.post('/api/auth/reissue-token');
  return data;
}
