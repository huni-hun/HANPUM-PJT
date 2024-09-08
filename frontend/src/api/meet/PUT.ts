import api from '../index';

/** 모임 신청 수락 */
export const PutAceeptGroup = async (groupMemberId: number) => {
  const response = await api.put(`/api/group/apply/${groupMemberId}/accept`);

  return response.data;
};

/** 모임 수정  */
export const PutGroup = async (
  groupId: number,
  multipartFile: string,
  groupPostReqDto: {
    title: string;
    description: string;
    recruitmentCount: number;
    recruitmentPeriod: string;
  },
) => {
  const params = {
    multipartFile,
    groupPostReqDto,
  };
  const response = await api.put(`/api/group/${groupId}`, params);
  return response.data;
};
