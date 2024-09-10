import { CreateMeetProps, CreateMeetRequestDto } from '@/models/meet';
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
export const PostGroup = async (props: CreateMeetProps) => {
  const formData = new FormData();
  const { multipartFile, ...rest } = props;
  console.log(multipartFile);
  console.log(rest);

  const groupPostReqDto = new Blob([JSON.stringify(rest)], {
    type: 'application/json',
  });

  groupPostReqDto.text().then((result) => {
    console.log(result); // JSON 문자열 출력
  });

  formData.append('multipartFile', multipartFile);
  formData.append('groupPostReqDto', groupPostReqDto);

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
