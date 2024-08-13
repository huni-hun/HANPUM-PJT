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

// 닉네임 중복 확인 TODO
export async function CheckNickname(nickname: string) {
  const { data } = await api.post('/api/auth/nickname-duplicate', {
    nickname,
  });
  return data;
}

// 회원가입TODO
export async function SignUp(signUpReq: any) {
  const { data } = await api.post('/api/auth/sign-up', {
    signUpReq,
  });
  return data;
}

// 로그인TODO
export async function Login(loginReq: any) {
  const { data } = await api.post('/api/auth/login', {
    loginReq,
  });
  return data;
}

// 로그아웃 TODO
export async function Logout() {
  const { data } = await api.post('/api/auth/logout');
  return data;
}

// refreshToken TODO RequestBody가 refreshToken이 맞는지?
export async function GetRefreshToken() {
  const { data } = await api.post('/api/auth/reissue-token');
  return data;
}
