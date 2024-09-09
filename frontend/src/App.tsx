import styled from 'styled-components';
import Router from '@pages/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom } from './atoms/isAuthEnticatedAtom';
import useIsAuth from './hooks/auth/useIsAuth';

function App() {
  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    setAuthEnticate(!!token);
  }, [setAuthEnticate]);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [setAuthEnticate, checkAuth]);

  // console.log('로그인 되어있는지 ::', temp);
  return (
    <Container>
      <ToastContainer position="top-center" autoClose={800} />
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
