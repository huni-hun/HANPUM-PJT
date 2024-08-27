import api from '../index';

/** 모임 - 모임 승인 거절 */
export const DeleteMeetDecline = async (
  scheduleDayId: number,
  token: string,
) => {
  const response = await api.delete('/api/schedule', {
    params: {
      scheduleId: scheduleDayId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      accept: '*/*',
    },
  });

  return response.data;
};
