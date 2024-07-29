import styled from 'styled-components';
import { colors } from '../styles/colorPalette';

function LoginPage() {
  return <LoginPageContainer>Login MainPage</LoginPageContainer>;
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${colors.green};
`;
