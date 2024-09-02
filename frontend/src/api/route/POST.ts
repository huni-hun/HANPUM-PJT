import axios from 'axios';
import api from '../index';
import { AddRouteProps } from '@/models/route';

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
  console.log(multipartFile);
  console.log(rest);
  const makeCourseReqDto = new Blob([JSON.stringify(rest)], {
    type: 'application/json',
  });
  makeCourseReqDto.text().then((res) => {
    console.log(res);
  });

  formData.append('makeCourseReqDto', makeCourseReqDto);
  formData.append('multipartFile', multipartFile);

  const response = await api.post('/api/course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoiaGFucHVtMSIsImlhdCI6MTcyNTE4NjkyMSwiZXhwIjoxNzI1MjU4OTIxfQ.nsTiEZhdH52hxvPgYNo93LNlm9h6UOZzZPeTGKBWakM',
    },
  });

  return response;
};
