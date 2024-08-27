/** 모임 - 필터 */

import { useState } from 'react';

import * as M from '@/components/Style/Meet/MeetFilter.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { RouteDetailProps } from '@/models/route';
import FilterTable from '@/components/Meet/FilterTable';

function MeetFilterPage() {
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<RouteDetailProps | null>(null);

  /** location table에서 cell 선택시 지역 뽑기 */
  const locationFilterClick = (location: string) => {
    console.log(`${location}`, '지역이 나옵니다.');
  };

  return (
    <MainPageContainer>
      <Header purpose="result" title="D-16" clickBack={() => navigate(-1)} />

      <M.RouteDateBox>
        <M.RouteDateInfoBox>
          <M.RoutePlaceInfoBox>
            <M.PointText>출발지</M.PointText>
            <M.PlaceText>{routeData?.start || '정보 없음'}</M.PlaceText>
          </M.RoutePlaceInfoBox>
          <M.RoutePlaceInfoBox>
            <M.PointText style={{ marginLeft: '1.5rem' }}>도착지</M.PointText>
            <M.PlaceText style={{ marginLeft: '1.5rem' }}>
              {routeData?.end || '정보 없음'}
            </M.PlaceText>
          </M.RoutePlaceInfoBox>
        </M.RouteDateInfoBox>
      </M.RouteDateBox>
      {/* filter - 지역 선택(table) */}
      <M.FilterBox>
        <FilterTable onClick={locationFilterClick} />
      </M.FilterBox>
    </MainPageContainer>
  );
}

export default MeetFilterPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
