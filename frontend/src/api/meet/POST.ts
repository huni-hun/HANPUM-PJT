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
  data: {
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
  console.log(data);
  const formData = new FormData();
  const groupPostReqDto = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });

  formData.append('groupPostReqDto', groupPostReqDto);
  formData.append('multipartFile', multipartFile);

  const response = await api.post(`/api/group`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 모임 관심 등록 - 채운
export async function addInterestMeetToggle(groupId: number) {
  const { data } = await api.post(`/api/group/${groupId}/like`);
  return data;
}
