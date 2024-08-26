import api from '../index';

/** 일정 - 일정 삭제 */
export const DeleteSchedule = async (scheduleDayId: number, token: string) => {
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
