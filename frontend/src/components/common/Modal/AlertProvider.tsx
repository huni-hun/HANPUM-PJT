import React from 'react';
import { useRecoilValue } from 'recoil';
import { createPortal } from 'react-dom';
import { alertStateAtom } from '@/atoms/alertStateAtom';
import Alert from './Alert';
import CalenderAlert from './CalenderAlert';

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const alertState = useRecoilValue(alertStateAtom);
  console.log(alertState);

  const $portal_root = document.getElementById('root-portal');

  const returnAlertComponent = () => {
    if (alertState.purpose === 'default') {
      return <Alert {...alertState} />;
    }

    if (alertState.purpose === 'calender') {
      return <CalenderAlert {...alertState} />;
    }
  };

  return (
    <>
      {children}
      {$portal_root != null
        ? createPortal(returnAlertComponent(), $portal_root)
        : null}
    </>
  );
}
