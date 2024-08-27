import api from '../index';

/** 일정 - 모임일정 생성 */
export const PostGroupSchedule = async (
  courseId: number,
  title: string,
  startDate: string,
  token: string,
) => {
  const response = await api.post(
    `/api/schedule/group?courseId=${courseId}&title=${encodeURIComponent(title)}&startDate=${startDate}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};

/** 일정 - 내일정 생성 */
export const PostMineSchedule = async (
  courseId: number,
  title: string,
  startDate: string,
  token: string,
) => {
  const response = await api.post(
    `/api/schedule?courseId=${courseId}&title=${encodeURIComponent(title)}&startDate=${startDate}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
