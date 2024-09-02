import { MeetFilterInfo } from '@/models/meet';
import { atom } from 'recoil';

export const meetFilterInfoAtom = atom<MeetFilterInfo>({
  key: 'meetFilter',
  default: {
    startPoint: '',
    endPoint: '',
    maxTotalDays: 0,
    maxRecruitmentCount: 0,
  },
});
