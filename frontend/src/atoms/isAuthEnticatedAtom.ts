import { atom } from 'recoil';

export const isAuthEnticatedAtom = atom({
  key: 'authState',
  default: false,
});

export const isInitAtom = atom({
  key: 'isInit',
  default: true,
});
