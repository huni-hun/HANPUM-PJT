import { atom } from 'recoil';

export const isAuthEnticatedAtom = atom({
  key: 'authState',
  default: !!localStorage.getItem('token'),
});
