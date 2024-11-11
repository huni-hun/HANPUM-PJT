import api from '../index';

// 회원 탈퇴
export async function WithdrawMembership() {
  const { data } = await api.delete('/api/member/delete');
  return data;
}
