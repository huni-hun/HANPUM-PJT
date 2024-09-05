import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect } from 'react';
import Form from '@/components/Login/Form';
import { useRecoilValue } from 'recoil';
import { isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import Cookies from 'js-cookie';
import { encodeToken } from '@/utils/util';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const init = useRecoilValue(isInitAtom);
  const navigate = useNavigate();

  const tryKakao = sessionStorage.getItem('send');

  useEffect(() => {
    if (tryKakao === 'true') {
      const memberType = Cookies.get('memberType');
      const accessToken = Cookies.get('accessToken');
      // console.log('memberType ::', memberType);
      // console.log('accessToken ::', accessToken);

      if (accessToken) {
        const token = encodeToken(accessToken.split('+')[1]);
        localStorage.setItem('token', JSON.stringify(token));
        Cookies.remove('accessToken', { path: '/' });
      }

      if (memberType === 'KAKAO_INCOMPLETE') {
        navigate('/signup');
      } else {
        navigate('/home');
      }
    }
  }, [tryKakao]);

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
