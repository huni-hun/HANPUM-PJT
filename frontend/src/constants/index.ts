import { Term } from '@/models/signup';

export const DEFAULT_SIZE = 20;

export const PATH = {
  SIGNUP: 'signup',
  LOGIN: 'login',
  MAIN: 'main',
  MEET: 'meet',
} as const;

export const APPLY = [
  { id: '01', title: '만 14세 (필수)', link: 'www.google.com' },
  {
    id: '02',
    title: '서비스 이용약관 동의 (필수)',
    link: 'www.google.com',
  },
  {
    id: '03',
    title: '개인정보 수집 및 이용 동의 (필수)',
    link: 'www.google.com',
  },
  {
    id: '04',
    title: '마케팅 정보 활용 및 수신 동의 (선택)',
    link: 'www.google.com',
  },
] as Term[];

export const STATUS = {
  success: 'SUCCESS',
  error: 'ERROR',
};
