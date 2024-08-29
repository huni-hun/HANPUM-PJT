import { SignupRequestValues } from '@/models/signup';
import api from '../index';

// 비밀번호 변경 TODO
export async function ChangePw(
  currentPassword: string,
  updatePassword: string,
) {
  const { data } = await api.put('/api/member/password-update', {
    currentPassword,
    updatePassword,
  });
  return data;
}

// 닉네임 변경
export async function ChangeNickname(nickname: string) {
  const { data } = await api.put('/api/member/nickname-update', {
    nickname,
  });
  return data;
}

// 회원정보 변경
export async function ChangeUserInfo(
  memberInfoReq: Partial<SignupRequestValues>,
) {
  const { data } = await api.put('/api/member/info-update', {
    ...memberInfoReq,
  });
  return data;
}

// 프로필 이미지 변경
export async function ChangeProfileImg(img: Blob) {
  console.log(img);
  const formData = new FormData();
  formData.append('multipartFile', img);

  const { data } = await api.put('/api/member/image-update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}
