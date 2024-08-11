import styled from 'styled-components';

import Form from '@/components/login/Form';

function LoginPage() {
  //TODO submit 함수 자식한테 뿌려주기 통신 로직만 page 컴포넌트에서
  return (
    <LoginPageContainer>
      {/* <TextField
        label="이메일2"
        name="email"
        placeholder="email 입력해주세요"
        hasError={true}
        helpMessage="email양식이 틀렸어요"
      /> */}

      <Form />
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
