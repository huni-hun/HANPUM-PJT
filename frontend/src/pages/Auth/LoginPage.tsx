import styled from 'styled-components';

import Entry from '@/components/Login/Entry';
import { useEffect, useState } from 'react';
import Form from '@/components/Login/Form';

function LoginPage() {
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
