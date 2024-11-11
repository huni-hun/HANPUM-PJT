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

// 관심 경로 리스트 조회 TODO
export async function GetInterestRouteList() {
  const { data } = await api.get('/api/member/like-course');

  return data;
}

// 내가 만든 경로 리스트 조회 TODO
export async function GetSelfRouteList() {
  const { data } = await api.get('/api/member/make-course');

  return data;
}

// 내가 사용한 경로 리스트 조회 TODO
export async function GetUseRouteList() {
  const { data } = await api.get('/api/member/use-course');

  return data;
}
