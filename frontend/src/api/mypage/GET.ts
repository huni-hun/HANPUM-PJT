import api from '../index';

// 프로필 조회
export async function GetUser() {
  const { data } = await api.get('/api/member/profile');

  return data;
}

// 관심 모임 리스트 조회
export async function GetInterestMeetList() {
  const { data } = await api.get('/api/member/like-groups');

  return data;
}
