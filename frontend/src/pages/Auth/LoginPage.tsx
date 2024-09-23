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
    const timer = setTimeout(() => {
      setSplashLoading(false);
      if (tryKakao === 'true') {
        const memberType = Cookies.get('memberType');
        const accessToken = Cookies.get('accessToken');

        if (accessToken) {
          const token = encodeToken(accessToken.split('+')[1]);
          if (token) {
            localStorage.setItem('token', token);
            Cookies.remove('accessToken', { path: '/' });
          }

          if (memberType === 'KAKAO_INCOMPLETE') {
            navigate('/signup');
          } else {
            setAuthEnticate(true);
            navigate('/home');
          }
        }
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [tryKakao, navigate, setAuthEnticate]);

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
