import { SignupRequestValues } from '@/models/signup';
import api from '../index';
import CryptoJS from 'crypto-js';

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
  const formData = new FormData();

  const { multipartFile, ...rest } = signupReq;
  console.log(signupReq);
  console.log(multipartFile);

  // 비밀번호 hash화
  // const hashedPassword = CryptoJS.SHA256(password).toString();
  const updatedRest = { ...rest };

  const signUpReqDto = new Blob([JSON.stringify(updatedRest)], {
    type: 'application/json',
  });

  formData.append('signUpReqDto', signUpReqDto);
  formData.append('multipartFile', multipartFile);

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

// 소셜 로그인
export async function KaKaoLogin(
  signupKaKaoReq: Pick<
    SignupRequestValues,
    'multipartFile' | 'nickname' | 'gender' | 'phoneNumber' | 'birthDate'
  >,
) {
  // console.log('signupKaKaoReq ::', signupKaKaoReq);
  const formData = new FormData();

  const { multipartFile, ...rest } = signupKaKaoReq;

  const updatedRest = { ...rest };

  const signupKaKaoReqDto = new Blob([JSON.stringify(updatedRest)], {
    type: 'application/json',
  });

  formData.append('kakaoSignUpCompleteReqDto', signupKaKaoReqDto);
  formData.append('multipartFile', multipartFile);

  const { data } = await api.post('/api/auth/complete-signup/kakao', formData, {
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

// 로그아웃
export async function Logout() {
  const { data } = await api.post('/api/auth/logout');
  return data;
}

// 토큰 재발급
export async function GetRefreshToken() {
  console.log('요청 호출');
  const { data } = await api.post('/api/auth/reissue-token');
  return data;
}

// 비밀번호 찾기 인증 메일
export async function CertificationFindPw(loginId: string, email: string) {
  const { data } = await api.post('/api/auth/find-password', {
    loginId,
    email,
  });
  return data;
}
