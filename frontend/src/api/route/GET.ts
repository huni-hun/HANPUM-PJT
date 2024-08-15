import api from '../index';

export async function getRouteList(type: string) {
  const response = await api.get(`/api/course?targetCourse=${type}`);

  return response;
}
