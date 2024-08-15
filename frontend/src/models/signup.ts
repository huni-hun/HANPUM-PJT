export interface SignupInfo {
  currStep: number;
  totalStep: number;
}

export interface Term {
  title: string;
  link: string;
  id: string;
}

export interface SignFormValues {
  id: String;
  password: String;
  name: String;
  gender: String;
  birth: String;
  email: String;
  address: String;
  tel: String;
  agreement: true;
  nickname: String;
  // profile :
  // type : ,
}
