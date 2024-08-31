import axios from 'axios';
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

export const GetDistance = (
  startlat: number,
  startlon: number,
  endlat: number,
  endlon: number,
) => {
  const response = axios.post(
    'http://localhost:8000/api/course/search/multiWaypoint',
    [
      {
        x: startlat,
        y: startlon,
      },
      {
        x: endlat,
        y: endlon,
      },
    ],
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
