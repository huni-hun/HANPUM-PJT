export interface SignupStep {
  currStep: number;
  totalStep: number;
}

export interface Term {
  title: string;
  link: string;
  id: string;
}

export interface SignupValues {
  loginId: string;
  password: string;
  checkPassword: string;
  email: string;
  profilePicture: string;
  name: string;
  birthDate: Date;
  gender: 'MAN' | 'WOMAN' | 'OTHER';
  phoneNumber: string;
  nickname: string;
  memberType: 'ADMIN' | 'COMMON';
  inputAuthCode: string;
}

export interface IncludeStepSignupValues extends SignupStep {
  step: SignupStep;
}

export interface CertificationValidate {
  checkId: string | boolean;
  checkEmail: string | boolean;
  checkNickname: string | boolean;
  checkComplete: string | boolean;
}

// export interface
