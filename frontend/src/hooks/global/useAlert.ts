import { AlertState, alertStateAtom } from '@/atoms/alertStateAtom';
import { useRecoilState } from 'recoil';

export function useAlert() {
  const [alertState, setAlertState] = useRecoilState(alertStateAtom);

  const close = () => {
    setAlertState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const open = ({ onButtonClick, ...options }: Omit<AlertState, 'open'>) => {
    setAlertState({
      ...options,
      open: true,
      onButtonClick: (cancel?: boolean) => {
        close();
        onButtonClick(cancel);
      },
    });
  };

  return {
    open,
    close,
  };
}
