import api from '../index';

/** 일정 - 진행중 tab */
export async function getRunningScheduleData() {
  const response = await api.get('/api/schedule/running');

  return response.data;
}

/** 일정 - 내일정 tab */
export async function getMyScheduleData() {
  const response = await api.get('/api/schedule');

  return response.data;
}

/** 일정 - 내일정 tab 상세 */
export async function getMyScheduleDetailData(scheduleId: string) {
  const response = await api.get(`/api/schedule/detail/${scheduleId}`, {
    params: {
      scheduleId: scheduleId,
    },
  });

  return response.data;
}

/** 일정 - 모임일정 tab */
export async function getGroupScheduleData() {
  const response = await api.get('/api/schedule/group');

  return response.data;
}

/** 일정 - 일자별 일정조회 */
export async function getDayNumData(id: string, dayNumber: number) {
  const response = await api.get(`/api/schedule/day/${dayNumber}`, {
    params: {
      scheduleId: id,
    },
  });

  return response.data;
}

/** 일정 - 주변 관광지 정보 가져오기 */
export async function getNearbyLocData(lat: number, lon: number) {
  const response = await api.get('/api/schedule/nearby', {
    params: {
      lat,
      lon,
    },
  });

  return response.data;
}

/** 날씨  */
export async function getWeather(lat: number, lon: number) {
  const response = await api.get('/api/weather', {
    params: {
      lat,
      lon,
    },
  });

  return response.data;
}

// 내 일정 조회 - 채운
export async function getMySchedule() {
  const { data } = await api.get('/api/schedule');

  return data;
}
