import api from '../index';

/** 모임 신청 */
export const PostMeetApply = async (groupId: number) => {
  const response = await api.post(`/api/group/${groupId}/apply`);

  return response.data;
};

/** 모임 관심 목록 등록 */
export const PostMeetLike = async (groupId: number) => {
  const response = await api.post(`/api/group/${groupId}/like`);

  return response.data;
};

/** 모임 그룹 생성 - 장효령이 한 거 */
export const PostGroup = async () => {
  const response = await api.post(`/api/group`);

  return response.data;
};

// 모임 관심 등록 - 채운
export async function addInterestMeetToggle(groupId: number) {
  const { data } = await api.post(`/api/group/${groupId}/like`);
  return data;
}
