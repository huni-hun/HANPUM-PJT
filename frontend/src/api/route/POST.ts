import api from '../index';

export const PostSearchPlace = (keyword: string) => {
  const response = api.post(
    '/api/course/search/waypoint',
    {
      keyword: keyword,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
