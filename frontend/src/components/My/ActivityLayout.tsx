import styled from 'styled-components';
import Header from '../common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import MyRoot from './category/MyRoot';
import FinishedRoot from './category/FinishedRoot';
import { colors } from '@/styles/colorPalette';
import Interest from './category/Interest';

function ActivityLayout() {
  const param = useParams().active?.split(':')[1];
  const navigate = useNavigate();

  // console.log(param);

  const returnTitle = (): string => {
    if (param === 'interest') {
      return '관심 목록';
    }
    if (param === 'myroot') {
      return '나의 경로';
    }
    if (param === 'finish') {
      return '사용한 경로';
    }
    return '';
  };

  return (
    <Layout>
      <Header
        purpose="title"
        title={returnTitle()}
        clickBack={() => {
          navigate(-1);
        }}
      />
      {param === 'interest' && <Interest />}
      {param === 'myroot' && <MyRoot />}
      {param === 'finish' && <FinishedRoot />}
    </Layout>
  );
}

export default ActivityLayout;

const Layout = styled.div`
  height: 100%;
  background-color: ${colors.white};
`;
