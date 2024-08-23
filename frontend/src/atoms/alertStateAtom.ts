import { atom } from 'recoil';

export interface AlertState {
  open: boolean;
  title?: string | null;
  purpose?: string;
  description?: string | null;
  onButtonClick: (cancel?: boolean) => void;
  element?: React.ReactNode;
}

export const alertStateAtom = atom<AlertState>({
  key: 'alertState',
  default: {
    purpose: '',
    open: false,
    title: null,
    description: null,
    element: null,
    onButtonClick: (cancel?: boolean) => {},
  },
});
