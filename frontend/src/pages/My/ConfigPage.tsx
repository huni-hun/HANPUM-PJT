import { Logout } from '@/api/signup/POST';
import Flex from '@/components/common/Flex';
import Header from '@/components/common/Header/Header';
import Text from '@/components/common/Text';
import ConfigItem from '@/components/My/config/ConfigItem';
import { STATUS } from '@/constants';
import { useAlert } from '@/hooks/global/useAlert';
import { colors } from '@/styles/colorPalette';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

function ConfigPage() {
  const navigate = useNavigate();

  const { mutate: logout } = useMutation(Logout, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

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

      <div className="container">
        <Flex direction="column">
          <Text
            as="div"
            $bold={true}
            $typography="t16"
            style={{ marginBottom: '1.6rem' }}
          >
            계정
          </Text>
          <ConfigItem label="비밀번호 변경" url="/config/:pw" />
          <ConfigItem label="회원탈퇴" url="/config/:withdraw" />
          <Text $typography="t16" onClick={() => logout()}>
            로그아웃
          </Text>
        </Flex>
      </div>
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
