import api from '..';

export const RouteDelete = (id: string) => {
  const response = api.delete(`/api/course/${id}`, {
    headers: {
      Accept: '*/*',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoia3l3NTQyNSIsImlhdCI6MTcyNTM3NTI5MiwiZXhwIjoxNzI1NDQ3MjkyfQ.JSfnO_ohUPrelcXPH_Sk5u9Y0c4PbFM9ukgsRcck7nw',
    },
  });

  return response;
};
