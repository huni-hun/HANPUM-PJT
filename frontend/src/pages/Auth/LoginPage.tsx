import styled from 'styled-components';

import Entry from '@/components/login/Entry';
import { useEffect, useState } from 'react';
import Form from '@/components/login/Form';

function LoginPage() {
  //TODO submit 함수 자식한테 뿌려주기 통신 로직만 page 컴포넌트에서

  const [init, setInit] = useState(true);

  useEffect(() => {
    setInit(true);
  }, []);
  return (
    <LoginPageContainer>
      {init && <Entry setInit={setInit} />} {!init && <Form />}
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
