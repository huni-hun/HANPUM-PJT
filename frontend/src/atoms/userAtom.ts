import { SignupRequestValues, SignupStep } from '@/models/signup';
import { atom } from 'recoil';

export const userAtom = atom<Partial<SignupRequestValues>>({
  key: 'user',
  default: {
    name: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
  },
});
