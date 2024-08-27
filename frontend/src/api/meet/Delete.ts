import api from '../index';

/** 모임 - 모임 승인 거절 */
export const DeleteMeetDecline = async (
  groupMemberId: number,
  token: string,
) => {
  const response = await api.delete(
    `/api/group/apply/${groupMemberId}/decline`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    },
  );

  return response.data;
};

/** 모임 - 멤버 추방 */
export const DeleteMeetExile = async (groupMemberId: number, token: string) => {
  const response = await api.delete(
    `/api/group/member/${groupMemberId}/exile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    },
  );

  return response.data;
};

/** 모임 - 멤버 탈퇴 */
export const DeleteMeetQuit = async (groupId: number, token: string) => {
  const response = await api.delete(`/api/group/${groupId}/quit`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};

/** 모임 - 신청 취소 */
export const DeleteMeetCancle = async (groupId: number, token: string) => {
  const response = await api.delete(`/api/group/${groupId}/apply`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};
