import { CreateMeetProps, CreateMeetRequestDto } from '@/models/meet';
import api from '../index';
import { schedulePostReqDto } from './../../models/meet';

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
  multipartFileatom: File,
  props: CreateMeetProps,
) => {
  console.log('multipartFileatom ::', multipartFileatom);
  console.log('props ::', props);
  const formData = new FormData();
  const { multipartFile, ...rest } = props;
  console.log(multipartFile);

  // const date = new Date(rest.groupPostReqDto.recruitmentPeriod);
  // const isoString = date.toISOString();
  // console.log(isoString);
  const updatedRest = { ...rest };
  // const updatedRest = {
  //   ...rest,
  //   groupPostReqDto: {
  //     ...rest.groupPostReqDto,
  //     recruitmentPeriod: isoString,
  //   },
  // };

  console.log('업데이트 한 것 ::', updatedRest);
  // console.log(schedulePostReqDto);

  console.log(rest.groupPostReqDto);

  // ISO 8601 형식으로 변환

  const groupPostReqDto = new Blob(
    [JSON.stringify(updatedRest.groupPostReqDto)],
    {
      type: 'application/json',
    },
  );

  // const schedulePostReqDtoBlod = new Blob(
  //   [JSON.stringify(schedulePostReqDto)],
  //   {
  //     type: 'application/json',
  //   },
  // );

  // groupPostReqDto.text().then((result) => {
  //   console.log(result); // JSON 문자열 출력
  // });

  formData.append('multipartFile', multipartFileatom);
  formData.append('groupPostReqDto', groupPostReqDto);
  // formData.append('schedulePostReqDto ', schedulePostReqDtoBlod);
  // formData.append('')
  formData.forEach((value, key) => {
    console.log(key, value);
  });
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
