import api from '..';

export const RouteDelete = (id: string) => {
  const response = api.delete(`/api/course/${id}`, {
    headers: {
      Accept: '*/*',
    },
  });

  return response;
};
