import api from '../index';

/** 일정 삭제 */
export const DeleteSchedule = async (scheduleDayId: number) => {
  const response = await api.delete('/api/schedule', {
    params: {
      scheduleId: scheduleDayId,
    },
  });

  return response.data;
};
