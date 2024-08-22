import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect, useState } from 'react';
import Form from '@/components/Login/Form';
import { useRecoilValue } from 'recoil';
import { isInitAtom } from '@/atoms/isAuthEnticatedAtom';

function LoginPage() {
  // const [init, setInit] = useState(true);
  const init = useRecoilValue(isInitAtom);

  // useEffect(() => {
  //   setInit(true);
  // }, []);
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
