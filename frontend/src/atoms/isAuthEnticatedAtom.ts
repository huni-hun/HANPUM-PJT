import { atom } from 'recoil';

export const isAuthEnticatedAtom = atom({
  key: 'authState',
  default: !!localStorage.getItem('token'),
});

export const isInitAtom = atom({
  key: 'isInit',
  default: true,
});
