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

export const PostSearchAttractions = (keyword: string) => {
  const response = api.post(
    '/api/course/search/attraction',
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
