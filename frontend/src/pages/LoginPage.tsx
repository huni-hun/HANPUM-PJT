import styled from 'styled-components';
import { colors } from '../styles/colorPalette';
import Flex from '@components/common/Flex';

function LoginPage() {
  return (
    <LoginPageContainer>
      <Flex direction="column">
        <span>안녕</span>
        <span>하세요</span>
      </Flex>
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${colors.green};
`;
