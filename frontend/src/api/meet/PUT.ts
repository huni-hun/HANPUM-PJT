import api from '../index';

/** 모임 신청 수락 */
export const PostGroup = async (groupMemberId: number, token: string) => {
  const response = await api.post(`/api/group/apply/${groupMemberId}/accept`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};
