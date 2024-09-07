import axios from 'axios';
import api from '../index';
import {
  AddRouteProps,
  LineStartEndProps,
  MapLinePathProps,
} from '@/models/route';

export const PostSearchPlace = async (keyword: string) => {
  const response = await api.post(
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

export const PostSearchAttractions = async (keyword: string) => {
  const response = await api.post(
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

export const GetDistance = async (
  startlat: number,
  startlon: number,
  endlat: number,
  endlon: number,
) => {
  const response = await api.post(
    '/api/course/search/multiWaypoint',
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

export const AddRoute = async (data: AddRouteProps) => {
  const formData = new FormData();

  const { multipartFile, ...rest } = data;

  const makeCourseReqDto = new Blob([JSON.stringify(rest)], {
    type: 'application/json',
  });

  formData.append('makeCourseReqDto', makeCourseReqDto);
  formData.append('multipartFile', multipartFile);

  const response = await api.post('/api/course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const GetLineData = async (data: MapLinePathProps[]) => {
  const response = api.post(
    '/api/course/search/tmapMulti',
    [
      // {
      //   x: start.x,
      //   y: start.y,
      // },
      // {
      //   x: end.x,
      //   y: end.y,
      // },
      ...data,
    ],
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};

export const SetRouteReview = async (
  id: string,
  content: string,
  score: number,
  reviewId: number,
) => {
  const response = api.post(
    `/api/course/${id}/reviews`,
    {
      content: content,
      score: score,
      reviewId: reviewId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response;
};
