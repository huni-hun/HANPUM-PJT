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
  email: string;
  profilePicture: string;
  name: string;
  birthDate: Date;
  gender: 'MAN' | 'WOMAN' | 'OTHER';
  phoneNumber: string;
  nickname: string;
  memberType: 'ADMIN' | 'COMMON';

  step: SignupStep;
  // profile :
  // type : ,
}
