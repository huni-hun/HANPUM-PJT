import styled from 'styled-components';

import { colors } from '@styles/colorPalette';
import Flex from '@components/common/Flex';
import Text from '@components/common/Text';

function LoginPage() {
  return (
    <LoginPageContainer>
      <Flex direction="column">
        <Text typography="t3">안녕</Text>
        <Text color="green">하세요</Text>
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
