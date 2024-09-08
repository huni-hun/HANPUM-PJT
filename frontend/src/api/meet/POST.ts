import api from '../index';

/** 모임 신청 */
export const PostMeetApply = async (groupId: number, applyPost: string) => {
  const response = await api.post(`/api/group/${groupId}/apply`, { applyPost });
  return response.data;
};

/** 모임 관심 목록 등록 */
export const PostMeetLike = async (groupId: number) => {
  const response = await api.post(`/api/group/${groupId}/like`);

  return response.data;
};

/** 모임 생성  */
export const PostGroup = async (
  multipartFile: string,
  groupPostReqDto: {
    title: string;
    description: string;
    recruitmentCount: number;
    recruitmentPeriod: string;
    schedulePostReqDto: {
      courseId: number;
      startDate: string;
    };
  },
) => {
  const params = {
    multipartFile,
    groupPostReqDto,
  };
  const response = await api.post(`/api/group`, params);
  return response.data;
};

// 모임 관심 등록 - 채운
export async function addInterestMeetToggle(groupId: number) {
  const { data } = await api.post(`/api/group/${groupId}/like`);
  return data;
}
