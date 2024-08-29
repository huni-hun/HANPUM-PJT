import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect, useState } from 'react';
import Form from '@/components/Login/Form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import Cookies from 'js-cookie';
import { encodeToken } from '@/utils/util';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // const [init, setInit] = useState(true);
  const init = useRecoilValue(isInitAtom);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setInit(true);
  // }, []);

  const setSignupStep = useSetRecoilState(signupStepAtom);

  // const [tryKakao, setTryKakao] = useState(localStorage.getItem('send'));
  const tryKakao = sessionStorage.getItem('send');
  console.log('tryKakao ::', tryKakao);

  useEffect(() => {
    // const testDebug = localStorage.getItem('test');
    if (tryKakao === 'true') {
      const memberType = Cookies.get('memberType');
      const accessToken = Cookies.get('accessToken');
      console.log('memberType ::', memberType);
      console.log('accessToken ::', accessToken);

      if (accessToken) {
        const token = encodeToken(accessToken.split('+')[1]);
        localStorage.setItem('token', JSON.stringify(token));
      }

      if (memberType === 'KAKAO_INCOMPLETE') {
        setSignupStep((prev) => ({
          ...prev,
          currStep: 2,
        }));
        navigate('/signup');
      } else {
        navigate('/');
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
