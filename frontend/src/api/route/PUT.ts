import { AddRouteProps, RetouchRouteProps } from '@/models/route';
import api from '../index';

export const RetouchRoute = async (data: RetouchRouteProps) => {
  const formData = new FormData();

  const { multipartFile, ...rest } = data;

  const editCourseReqDto = new Blob([JSON.stringify(rest)], {
    type: 'application/json',
  });
  editCourseReqDto.text().then((res) => {
    // console.log(res);
  });

  formData.append('editCourseReqDto', editCourseReqDto);
  formData.append('multipartFile', multipartFile);

  const response = await api.put('/api/course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const UpdateReview = async (
  id: string,
  content: string,
  score: number,
  reviewId: number,
) => {
  const response = api.put(
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

export const UpdateOpenState = async (id: number) => {
  const response = api.put(`/api/course/${id}/changeOpen`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response;
};
