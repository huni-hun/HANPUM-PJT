import { MeetRequestDto } from '@/models/meet';
import api from '../index';

/** 모임 신청 리스트 조회 */
export const GetMeetApplyList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}/apply-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 신청 리스트 조회 */
export const GetMeetMemberList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}/member-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 멤버 상세 조회 */
export const GetMeetMemberDetailList = async (
  groupId: number,
  groupMemberId: number,
  token: string,
) => {
  const response = await api.get(
    `/api/group/${groupId}/member/${groupMemberId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    },
  );

  return response.data;
};

/** 모임 상세 조회 */
export const GetMeetDetailList = async (groupId: number, token: string) => {
  const response = await api.get(`/api/group/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

// export async function GetGroupList(requestDto: MeetRequestDto) {
//   const { startPoint, endPoint, maxTotalDays, maxRecruitmentCount, pageable } =
//     requestDto;
//   const { data } = await api.get('/api/group', {
//     params: {
//       startPoint,
//       endPoint,
//       maxTotalDays,
//       maxRecruitmentCount,
//       ...pageable, // pageable 객체를 그대로 펼쳐서 추가
//     },
//   });
//   return data;
// }

// 모임 리스트 조회 - 채운
export async function GetGroupList(requestDto: MeetRequestDto) {
  const { startPoint, endPoint, maxTotalDays, maxRecruitmentCount, pageable } =
    requestDto;
  const { page, size, sort } = pageable;

  const params: any = {
    page: page,
    size: size,
    sort: sort,
  };

  if (startPoint) {
    params.startPoint = startPoint;
  }

  if (endPoint) {
    params.endPoint = endPoint;
  }

  if (maxTotalDays && maxTotalDays > 0) {
    params.maxTotalDays = maxTotalDays;
  }

  if (maxRecruitmentCount && maxRecruitmentCount > 0) {
    params.maxRecruitmentCount = maxRecruitmentCount;
  }

  const { data } = await api.get('/api/group', { params });
  return data;
}

// 내가 만든 모임 조회
export async function GetMyMeet() {
  const { data } = await api.get('/api/group/member');
  return data;
}
