import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect, useState } from 'react';
import Form from '@/components/Login/Form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom, isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import Cookies from 'js-cookie';
import { encodeToken } from '@/utils/util';
import { useNavigate } from 'react-router-dom';
import TermsText from '@/components/My/config/TermsText';
import PersonalInformationText from '@/components/My/config/PersonalInformationText';
import Splash from '@/components/Login/Splash';

function LoginPage() {
  const [splashLoading, setSplashLoading] = useState(true);
  const init = useRecoilValue(isInitAtom);
  const navigate = useNavigate();

  const tryKakao = sessionStorage.getItem('send');

  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰을 가져옴

    if (token) {
      // 토큰이 있으면 바로 홈으로 이동
      setAuthEnticate(true);
      navigate('/home');
    } else {
      // 토큰이 없으면 스플래시 화면을 2.8초 동안 보여줌
      setSplashLoading(true);
      const timer = setTimeout(() => {
        setSplashLoading(false);
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [setAuthEnticate]);

  useEffect(() => {
    if (tryKakao === 'true') {
      const memberType = Cookies.get('memberType');
      const accessToken = Cookies.get('accessToken');

      // console.log('여기?');

      if (accessToken) {
        const token = encodeToken(accessToken.split('+')[1]);

        if (token) {
          localStorage.setItem('token', token);
          Cookies.remove('accessToken', { path: '/' });
        }
        // if (memberType === 'KAKAO_INCOMPLETE') {
        //   navigate('/signup');
        // } else {
        //   setAuthEnticate(true);
        //   navigate('/home');
        // }
      }
    }
  }, [tryKakao]);

  if (splashLoading) {
    return <Splash />;
  }
  return (
    <LoginPageContainer>
      {init && <Entry />} {!init && <Form />}
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100%;
`;
