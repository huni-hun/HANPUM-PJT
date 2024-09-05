import api from '../index';

/** 모임 신청 수락 */
export const PutAceeptGroup = async (groupMemberId: number) => {
  const response = await api.post(`/api/group/apply/${groupMemberId}/accept`);

  return response.data;
};
