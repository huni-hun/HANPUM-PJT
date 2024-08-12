import api from '../index';

export async function CheckId(loginId: string) {
  console.log('loginId ::', loginId);

  const { data } = await api.post('api/user/signup', loginId);
  return data;
}
