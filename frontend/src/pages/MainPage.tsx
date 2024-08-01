import { BottomTab } from '@/components/common/BottomTab/BottomTab.styled';
import styled from 'styled-components';

function MainPage() {
  return (
    <MainPageContainer>
      <BottomTab />
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
