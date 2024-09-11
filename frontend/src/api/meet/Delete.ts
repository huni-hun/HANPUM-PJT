import api from '../index';

/** 모임 - 모임 승인 거절 */
export const DeleteMeetDecline = async (groupMemberId: number) => {
  const response = await api.delete(
    `/api/group/apply/${groupMemberId}/decline`,
  );

  return response.data;
};

/** 모임 - 멤버 추방 */
export const DeleteMeetExile = async (groupMemberId: number) => {
  const response = await api.delete(`/api/group/member/${groupMemberId}/exile`);

  return response.data;
};

/** 모임 - 멤버 탈퇴 */
export const DeleteMeetQuit = async (groupId: number) => {
  const response = await api.delete(`/api/group/${groupId}/quit`);

  return response.data;
};

/** 모임 - 신청 취소 */
export const DeleteMeetCancle = async (groupId: number) => {
  const response = await api.delete(`/api/group/${groupId}/apply`);

  return response.data;
};

/** 모임 - 신청 취소 */
export const DeleteMeet = async (groupId: number) => {
  const response = await api.delete(`/api/group/${groupId}`);

  return response.data;
};

// 모임 관심 취소
export async function DeleteMeetLike(groupId: number) {
  const { data } = await api.delete(`/api/group/${groupId}/dislike`);
  return data;
}
