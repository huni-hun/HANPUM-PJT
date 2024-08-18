import api from '../index';

// 비밀번호 찾기 TODO
export async function FindPw(loginId: string, email: string) {
  const { data } = await api.put('/api/auth/find-password', {
    loginId,
    email,
  });
  return data;
}
