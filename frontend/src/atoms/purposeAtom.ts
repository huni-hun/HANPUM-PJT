import { atom } from 'recoil';

type purpose =
  | 'default'
  | 'title'
  | 'result'
  | 'root'
  | 'merge'
  | 'search-place'
  | 'search';

export const purposeAtom = atom<purpose>({
  key: 'purpose',
  default: 'title',
});
