import styled from 'styled-components';
import Router from '@pages/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom } from './atoms/isAuthEnticatedAtom';
import useIsAuth from './hooks/auth/useIsAuth';

function App() {
  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);

  const temp = useIsAuth();

  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setAuthEnticate(true);
    } else if (sessionStorage.getItem('token') != null) {
      setAuthEnticate(true);
    } else {
      setAuthEnticate(false);
    }
  }, []);

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
