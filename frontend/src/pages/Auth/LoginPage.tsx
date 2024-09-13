import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect } from 'react';
import Form from '@/components/Login/Form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isAuthEnticatedAtom, isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import Cookies from 'js-cookie';
import { encodeToken } from '@/utils/util';
import { useNavigate } from 'react-router-dom';
import TermsText from '@/components/My/config/TermsText';
import PersonalInformationText from '@/components/My/config/PersonalInformationText';

function LoginPage() {
  const init = useRecoilValue(isInitAtom);
  const navigate = useNavigate();

  const tryKakao = sessionStorage.getItem('send');

  const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);

  useEffect(() => {
    if (tryKakao === 'true') {
      // console.log('여기임?');
      const memberType = Cookies.get('memberType');
      const accessToken = Cookies.get('accessToken');

      if (accessToken) {
        const token = encodeToken(accessToken.split('+')[1]);

        if (token) {
          localStorage.setItem('token', token);
          Cookies.remove('accessToken', { path: '/' });

          // window.dispatchEvent(new Event('storage')); // 강제로 storage 이벤트 발생
        }
        if (memberType === 'KAKAO_INCOMPLETE') {
          // console.log('회원가입 해야해요');
          navigate('/signup');
        } else {
          // console.log('회원가입 이미 되어있어요.');
          setAuthEnticate(true);
          navigate('/home');
        }
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
