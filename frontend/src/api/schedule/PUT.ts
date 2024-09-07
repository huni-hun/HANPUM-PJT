import api from '../index';

/** 일정 - 경유지 도착처리 */
export const PutScheduleArrive = async (scheduleWayPointId: number) => {
  const data = {
    scheduleWayPointId,
  };

  const response = await api.put('/api/schedule/arrive', data);
  return response;
};

/** 일정 - 일차별 일정 상태 전환 */
export const PutRunState = async (scheduleDayId: number) => {
  const data = {
    scheduleDayId,
  };

  const response = await api.put('/api/schedule/run', data);

  return response;
};

/** 일정 - 전체 일정 시작, 종료*/
export const PutStartDate = async (scheduleDayId: number) => {
  const data = {
    scheduleDayId,
  };

  const response = await api.put('/api/schedule/start', data);

  return response;
};

/** 일정 - 수정 */
export const PutSchedule = async (scheduleId: number, startDate: string) => {
  const data = {
    scheduleId,
    startDate,
  };

  const response = await api.put('/api/schedule/modify', data);
  return response;
};
