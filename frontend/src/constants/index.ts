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

export const ANNOUNCEMENT = [
  {
    id: '01',
    title: '한품 정식 출시 안내',
    date: '2023.08.18 12 : 34',
    desc: '안녕하세요 한품입니다.\n\n드디어 국토 대장정 플랫폼 한품이 정식 출시되었습니다.\n\n한품을 통해 국토 대장정의 모든 순간을 계획하고\n\n기록하며, 다른 참여자들과 경험을 나눌 수 있습니다.\n\n앞으로도 많은 관심과 이용 부탁드립니다.\n\n감사합니다.',
  },
  {
    id: '02',
    title: '한품 정식 출시 안내',
    date: '2023.08.18 13 : 34',
    desc: '안녕하세요 한품입니다.\n\n드디어 국토 대장정 플랫폼 한품이 정식 출시되었습니다.\n\n한품을 통해 국토 대장정의 모든 순간을 계획하고\n\n기록하며, 다른 참여자들과 경험을 나눌 수 있습니다.\n\n앞으로도 많은 관심과 이용 부탁드립니다.\n\n감사합니다.',
  },
  {
    id: '03',
    title: '한품 정식 출시 안내',
    date: '2023.08.18 14 : 34',
    desc: '안녕하세요 한품입니다.\n\n드디어 국토 대장정 플랫폼 한품이 정식 출시되었습니다.\n\n한품을 통해 국토 대장정의 모든 순간을 계획하고\n\n기록하며, 다른 참여자들과 경험을 나눌 수 있습니다.\n\n앞으로도 많은 관심과 이용 부탁드립니다.\n\n감사합니다.',
  },
];
