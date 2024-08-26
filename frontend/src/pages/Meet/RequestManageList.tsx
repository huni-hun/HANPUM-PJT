/** 모임 - 모임 신청 관리 */

import { useState } from 'react';

import * as M from '@/components/Style/Meet/MeetFilter.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { RouteDetailProps } from '@/models/route';
import FilterTable from '@/components/Meet/FilterTable';
import MemberList from '@/components/Meet/MemberList';
import memberImg from '../../assets/img/memberImg.svg';

function RequestManageList() {
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<RouteDetailProps | null>(null);

  /** member data */
  const memberInfo = [
    { img: memberImg, name: '닉네임' },
    { img: memberImg, name: '닉네임' },
    { img: memberImg, name: '닉네임' },
  ];

  return (
    <MainPageContainer>
      <Header
        purpose="result"
        title="모임 신청 관리"
        clickBack={() => navigate(-1)}
      />
      <MemberList memberInfo={memberInfo} onClick={() => {}} />
    </MainPageContainer>
  );
}

export default RequestManageList;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
