import { AddRouteProps } from '@/models/route';
import api from '../index';

export const RetouchRoute = async (data: AddRouteProps) => {
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
        'Bearer yJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiQ09NTU9OIiwic3ViIjoiaGFucHVtMSIsImlhdCI6MTcyNTE4NjkyMSwiZXhwIjoxNzI1MjU4OTIxfQ.nsTiEZhdH52hxvPgYNo93LNlm9h6UOZzZPeTGKBWakM',
    },
  });

  return response;
};
