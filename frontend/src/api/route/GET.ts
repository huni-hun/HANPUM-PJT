import api from '../index';

export async function getRouteList(type: string, size: number) {
  const response = await api.get(
    `/api/course?targetCourse=${type}&size=${size}&page=0&sort=popularity,DESC`,
  );

  return response;
}

export async function getRouteMoreList(
  type: string,
  size: number,
  pageParams: number,
) {
  const response = await api.get(
    `/api/course?targetCourse=${type}&size=${size}&page=${pageParams}&sort=popularity,DESC`,
  );

  return response;
}

export async function getRouteSearchList(keyword: string) {
  const response = await api.get(
    `/api/course?size=10&page=0&sort=popularity,DESC&kwyword=${keyword}`,
  );

  return response;
}

export async function getRouteSearchListWithProps(
  keyword: string,
  distance: string,
  days: string,
  types: string,
  page: number,
) {
  const response = await api.get(
    `/api/course?size=8&page=${page}&sort=popularity,DESC&kwyword=${keyword}${distance}${days}${types}`,
  );

  return response;
}

export async function getRouteDetail(id: string) {
  const response = await api.get(`/api/course/${id}`);
  return response;
}

export async function getRouteDayDetail(id: string, day: number) {
  const response = await api.get(`/api/course/${id}/days/${day}`);

  return response;
}

export async function getRouteDayAttraction(id: string, day: number) {
  const response = await api.get(`/api/course/${id}/days/${day}/attract`);

  return response;
}

export async function getRouteReview(id: string) {
  const response = await api.get(`/api/course/${id}/reviews`);

  return response;
}

export async function setRouteLike(id: string) {
  const response = await api.get(`/api/course/${id}/like`, {
    headers: {
      Accept: '*/*',
    },
  });

  return response;
}

// 메인에서 두개 짜리 임시 - 채운
export async function getMainRouteList(type: string) {
  const { data } = await api.get(
    `/api/course?targetCourse=${type}&size=2&page=0&sort=popularity,DESC`,
  );

  return data;
}

export async function addInterestRoute(course_id: number) {
  const { data } = await api.get(`/api/course/${course_id}/like`);

  return data;
}
