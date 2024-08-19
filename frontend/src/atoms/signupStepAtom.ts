import { SignupStep } from '@/models/signup';
import { atom } from 'recoil';

export const signupStepAtom = atom<SignupStep>({
  key: 'signupStep',
  default: {
    currStep: 3,
    totalStep: 3,
  },
});
