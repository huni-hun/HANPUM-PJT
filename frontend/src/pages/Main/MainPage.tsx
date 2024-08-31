import styled from 'styled-components';

import BottomTab from '@components/common/BottomTab/BottomTab';
import Schedule from '@components/Main/Schedule';
import Text from '@components/common/Text';
import Course from '@components/Main/Course';
import Meet from '@components/Main/Meet';
import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSetRecoilState } from 'recoil';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import { encodeToken } from '@/utils/util';
import { colors } from '@/styles/colorPalette';

function MainPage() {
  return (
    <MainPageContainer>
      <Header purpose="main" isBorder={true} clickBack={() => {}} />
      <div className="container">
        <div className="padding-box">
          <Schedule />
          <Text $typography="t20">동동님을 위한 추천코스</Text>
          <Course />
          <Text $typography="t20">한품 PICK 모임 추천</Text>
        </div>
        <Meet />
        <BottomTab />
      </div>
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: ${colors.white};
  .container {
    width: 100%;
    height: 100%;
    /* background-color: pink; */
    .padding-box {
      padding: 0px 16px;
      box-sizing: border-box;
    }
  }
`;
