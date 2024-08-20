import api from '../index';

// 아이디 찾기 TODO
export async function FindId(name: string, email: string) {
  const { data } = await api.get('/api/auth/find-id', {
    params: {
      name,
      email,
    },
  });

  return data;
}
