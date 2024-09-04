import api from '../index';

export async function deleteInterestRoute(course_id: number) {
  const { data } = await api.delete(`/api/course/${course_id}/like`);

  return data;
}
