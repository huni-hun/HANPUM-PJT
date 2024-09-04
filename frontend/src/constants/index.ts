import { LabelValue, Term } from '@/models/signup';

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
  fail: 'FAIL',
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

export const POLICY = [
  {
    id: '01',
    title: '한품 서비스 이용약관',
    date: '2023.08.18 12 : 34',
    desc: '이용약관 ~~',
  },
  {
    id: '02',
    title: '개인정보 처리 방침',
    date: '2023.08.18 13 : 34',
    desc: '개인정보 ~~',
  },
];

export const WITHDRAW = [
  {
    id: '01',
    title: '개인 정보 및 이용기록이 영구적으로 삭제돼요.',
    desc: '회원 탈퇴가 완료되면 모든 개인 정보 및 이용 기록이 영구적으로 삭제되며, 복구가 불가능합니다.',
  },

  {
    id: '02',
    title: '재가입 및 복구가 불가능해요',
    desc: '탈퇴 후에 서비스 이용 악용 방지를 위해 탈퇴 후 7일 이내 재가입이 불가능하며, 기존 데이터는 복원되지 않습니다.',
  },

  {
    id: '03',
    title: '이용이 불가능해요',
    desc: '현재 사용 중인 혜택 및 서비스를 더 이상 이용할 수 없습니다',
  },
];
export const genderList: LabelValue[] = [
  {
    label: '남성',
    value: 'MAN',
  },
  {
    label: '여성',
    value: 'WOMAN',
  },
  {
    label: '기타',
    value: 'OTHER',
  },
];

export const sortList: LabelValue[] = [
  {
    label: '최신 순',
    value: 'latest, desc',
  },
  {
    label: '인기가 많은 순',
    value: 'likeCount, desc',
  },
  {
    label: '경로 길이 짧은 순',
    value: 'totalDistance, desc',
  },
  {
    label: '경로 길이 긴 순',
    value: 'totalDistance, asc',
  },
  {
    label: '설정 안함',
    value: 'nothing',
  },
];

export const locationArray: string[] = [
  '전체',
  '서울',
  '인천',
  '경기',
  '강원',
  '대전',
  '충남',
  '충북',
  '광주',
  '전남',
  '전북',
  '부산',
  '경남',
  '경북',
  '제주도',
];
