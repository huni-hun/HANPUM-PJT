import api from '../index';

/** 모임 - 모임 승인 거절 */
export const DeleteMeetDecline = async (scheduleDayId: number) => {
  const response = await api.delete('/api/schedule', {
    params: {
      scheduleId: scheduleDayId,
    },
  });

  return response.data;
};
