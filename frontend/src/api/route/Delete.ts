import api from '../index';

export async function deleteInterestRoute(course_id: number) {
  const { data } = await api.delete(`/api/course/${course_id}/like`);

  return data;
}

export const RouteDelete = async (id: string) => {
  const response = await api.delete(`/api/course/${id}`, {
    headers: {
      Accept: '*/*',
    },
  });

  return response;
};

export const RouteLikeDelete = async (id: string) => {
  const response = await api.delete(`/api/course/${id}/like`, {
    headers: {
      Accept: '*/*',
    },
  });

  return response;
};
