import { CreateMeetRequestDto } from '@/models/meet';
import { atom } from 'recoil';

export const meetCreateImage = atom<File | null>({
  key: 'meetCreateImage',
  default: null,
});
