import api from '../index';

export async function CheckId(loginId: string) {
  console.log('loginId ::', loginId);

  const { data } = await api.post('/api/auth/login-id/check', {
    loginId: loginId,
  });
  return data;
}
