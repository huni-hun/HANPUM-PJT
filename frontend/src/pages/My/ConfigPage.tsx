import Flex from '@/components/common/Flex';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import ConfigItem from '@/components/My/config/ConfigItem';
import { colors } from '@/styles/colorPalette';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function ConfigPage() {
  const navigate = useNavigate();
  return (
    <ConfigPageContainer>
      <Header
        purpose="title"
        title="설정"
        clickBack={() => {
          navigate(-1);
        }}
      />

      <div className="container">
        <Flex direction="column" style={{ paddingBottom: '0.4rem' }}>
          <Text
            as="div"
            $bold={true}
            $typography="t16"
            style={{ marginBottom: '1.6rem' }}
          >
            안내
          </Text>
          <ConfigItem label="공지사항" url="/config/:announcement" />
          <ConfigItem label="이용약관 및 정책" url="/config/:policy" />
        </Flex>
      </div>

      <div className="line" />

      {/* <div className="container">
        <Flex direction="column">
          <Text
            as="div"
            $bold={true}
            $typography="t16"
            style={{ marginBottom: '1.6rem' }}
          >
            계정
          </Text>
          <ConfigItem label="비밀번호 변경" />
          <ConfigItem label="회원탈퇴" />
        </Flex>
      </div> */}
    </ConfigPageContainer>
  );
}

export default ConfigPage;

const ConfigPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  .container {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .line {
    width: 100%;
    height: 8px;
    background-color: #e5e5e5;
  }
`;
