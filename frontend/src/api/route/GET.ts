import api from '../index';

export async function getRouteList(type: string) {
  const response = await api.get(
    `/api/course?targetCourse=${type}&size=10&page=0&sort=popularity,DESC`,
  );

  return response;
}

export async function getRouteDetail(id: string) {
  console.log(id);
  const response = await api.get(`/api/course/${id}`);
  console.log(response);
  return response;
}

export async function getRouteDayDetail(id: string, day: number) {
  const response = await api.get(`/api/course/${id}/days/${day}`);

  return response;
}

export async function getRouteReview(id: string) {
  const response = await api.get(`/api/course/${id}/reviews`);

  return response;
}
