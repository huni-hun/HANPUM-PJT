import Header from '@/components/common/Header/Header';
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
    </ConfigPageContainer>
  );
}

export default ConfigPage;

const ConfigPageContainer = styled.div``;
