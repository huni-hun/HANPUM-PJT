import styled from 'styled-components';

import BottomTab from '@components/common/BottomTab/BottomTab';
import Schedule from '@components/Main/Schedule';
import Text from '@components/common/Text';
import Course from '@components/Main/Course';
import Meet from '@components/Main/Meet';
import Header from '@/components/common/Header/Header';

function MainPage() {
  return (
    <MainPageContainer>
      <Header purpose="search" />
      <div className="padding-box">
        <Schedule />
        <Text $typography="t20">동동님을 위한 추천코스</Text>
        <Course />
        <Text $typography="t20">모임추천</Text>
      </div>
      <Meet />
      <BottomTab />
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .padding-box {
    padding: 0px 16px;
    box-sizing: border-box;
  }
`;
