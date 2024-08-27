/** 모임 - 모임신청 */

import { useState } from 'react';

import * as M from '@/components/Style/Meet/MeetRequest';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { RouteDetailProps } from '@/models/route';
import memberImg from '../../assets/img/memberImg.svg';
import BaseButton from '@/components/common/BaseButton';

function MeetRequest() {
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<RouteDetailProps | null>(null);

  /** member data */
  const dummyMemberData = [
    {
      img: memberImg,
      nickname: '닉네임',
      name: '김동길',
      gender: '남',
      birth: '2000-11-09',
    },
  ];

  const profileDetails = [
    { title: '이름', content: dummyMemberData[0].name },
    { title: '성별', content: dummyMemberData[0].gender },
    { title: '생년월일', content: dummyMemberData[0].birth },
  ];

  return (
    <MainPageContainer>
      <Header
        purpose="result"
        title="모임 신청"
        clickBack={() => navigate(-1)}
      />
      <M.InfoWrap>
        <M.ProfileBox>
          <M.Img>
            <img src={dummyMemberData[0].img} />
          </M.Img>
          <M.Name>{dummyMemberData[0].nickname}</M.Name>
        </M.ProfileBox>
        <M.ProfileInfo>
          {profileDetails.map((detail, index) => (
            <M.ProfileInfoDetail key={index}>
              <M.ProfileInfoTitle>{detail.title}</M.ProfileInfoTitle>
              <M.ProfileInfoContent>{detail.content}</M.ProfileInfoContent>
            </M.ProfileInfoDetail>
          ))}
        </M.ProfileInfo>
        <M.InfoInputBox>
          <M.InfoText>지원글을 작성해주세요</M.InfoText>
          <M.InfoInput></M.InfoInput>

          <BaseButton
            size="large"
            style={{ margin: '15rem 5.5rem', padding: '0 2rem' }}
            onClick={() => {}}
          >
            신청하기
          </BaseButton>
        </M.InfoInputBox>
      </M.InfoWrap>
    </MainPageContainer>
  );
}

export default MeetRequest;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
