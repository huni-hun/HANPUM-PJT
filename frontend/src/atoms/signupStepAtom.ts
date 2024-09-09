import { SignupStep } from '@/models/signup';
import { atom } from 'recoil';

export const signupStepAtom = atom<SignupStep>({
  key: 'signupStep',
  default: {
    currStep: 1,
    totalStep: 3,
  },
});
