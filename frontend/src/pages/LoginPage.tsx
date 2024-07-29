import styled from 'styled-components';

import { colors } from '@styles/colorPalette';
import Flex from '@components/common/Flex';
import Text from '@components/common/Text';
import TextField from '@components/common/TextField';

function LoginPage() {
  return (
    <LoginPageContainer>
      <Flex direction="column">
        <Text typography="t3">안녕</Text>
        <Text color="green">하세요</Text>
      </Flex>

      <TextField label="이메일" name="email" placeholder="email 입력해주세요" />
      <TextField
        label="이메일2"
        name="email"
        placeholder="email 입력해주세요"
        hasError={true}
        helpMessage="email양식이 틀렸어요"
      />
    </LoginPageContainer>
  );
}

export default LoginPage;

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${colors.green};
`;
