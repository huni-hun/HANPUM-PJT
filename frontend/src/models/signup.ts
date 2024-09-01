export interface SignupStep {
  currStep: number;
  totalStep: number;
}

// 약관 동의
export interface Term {
  title: string;
  link: string;
  id: string;
}

// 회원가입에 필요한 request
export interface SignupRequestValues {
  loginId: string;
  password: string;
  email: string;
  multipartFile: Blob | string;
  name: string;
  birthDate: string;
  gender: string | null;
  phoneNumber: string;
  nickname: string;
  memberType: 'ADMIN' | 'COMMON';
}

export interface UserSignupFormValues extends SignupRequestValues {
  checkPassword: string;
  sendAuthCode: boolean; // 메일 인증
  checkAuthCode: string; // 메일 인증 에러
  inputAuthCode: string; // 인증코드
  sendLoginId: boolean; // id 중복확인
  checkLoginId: string; // id 중복확인 에러
  sendEmail: boolean; // 메일 인증코드
  checkEmail: string; // 메일 인증코드 에러
  sendNickname: boolean; // 닉네임 인증
  checkNickname: string; // 닉네임 인증코드 에러
}

export interface Gender {
  label: string;
  value: string;
}

// 비밀번호 변경
export interface ChangePasswordValues {
  currentPassword: string;
  updatePassword: string;
}

export interface ChangePasswordIncludCheckValues extends ChangePasswordValues {
  checkPassword: string;
}
