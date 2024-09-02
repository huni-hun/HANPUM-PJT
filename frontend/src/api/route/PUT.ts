import { AddRouteProps, RetouchRouteProps } from '@/models/route';
import api from '../index';

export const RetouchRoute = async (data: RetouchRouteProps) => {
  const formData = new FormData();

  const { multipartFile, ...rest } = data;

  const editCourseReqDto = new Blob([JSON.stringify(rest)], {
    type: 'application/json',
  });
  editCourseReqDto.text().then((res) => {
    console.log(res);
  });

  formData.append('editCourseReqDto', editCourseReqDto);
  formData.append('multipartFile', multipartFile);

  const response = await api.put('/api/course', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoiaGFucHVtMSIsImlhdCI6MTcyNTE5MzAyNywiZXhwIjoxNzI1MjY1MDI3fQ.So7RT5ZryrX-G4UYXxgqG47xr8W_IGTtV2XOJ0lXOHY',
    },
  });

  return response;
};
