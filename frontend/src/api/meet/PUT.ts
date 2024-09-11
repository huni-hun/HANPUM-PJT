import { CreateMeetProps } from '@/models/meet';
import api from '../index';

/** 모임 신청 수락 */
export const PutAceeptGroup = async (groupMemberId: number) => {
  const response = await api.put(`/api/group/apply/${groupMemberId}/accept`);

  return response.data;
};

/** 모임 수정  */
export const PutGroup = async (
  groupId: number,
  props: CreateMeetProps,
  multipartFileatom?: File,
) => {
  const formData = new FormData();
  const { groupPostReqDto } = props;

  const groupUpdateReqDto = new Blob([JSON.stringify(groupPostReqDto)], {
    type: 'application/json',
  });

  // multipartFileatom이 있는 경우에만 파일 추가
  if (multipartFileatom) {
    formData.append('multipartFile', multipartFileatom);
  }

  // groupUpdateReqDto 추가
  formData.append('groupUpdateReqDto', groupUpdateReqDto);

  // 디버깅용: formData에 들어간 데이터 출력
  formData.forEach((value, key) => {
    // console.log(`${key}:`, value);
  });

  // API 요청 보내기
  const response = await api.put(`/api/group/${groupId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Content-Type은 브라우저에서 자동 설정
    },
  });

  return response.data;
};
