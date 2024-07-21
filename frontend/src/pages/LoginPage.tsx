import styled from "styled-components";
import Icon from "../components/common/Icon/Icon";

function LoginPage() {
  return <LoginPageContainer>Login Page

    <Icon name="IconNext" size={20}/>
  </LoginPageContainer>;
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
