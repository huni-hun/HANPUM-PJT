import api from '../index';

/** 모임 신청 */
export const PostMeetApply = async (groupId: number, token: string) => {
  const response = await api.post(`/api/group/${groupId}/apply`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 관심 목록 등록 */
export const PostMeetLike = async (groupId: number, token: string) => {
  const response = await api.post(`/api/group/${groupId}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 그룹 생성 */
export const PostGroup = async (token: string) => {
  const response = await api.post(`/api/group`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

// 모임 관심 등록 - 채운
export async function addInterestMeetToggle(groupId: number) {
  const { data } = await api.post(`/api/group/${groupId}/like`);
  return data;
}
