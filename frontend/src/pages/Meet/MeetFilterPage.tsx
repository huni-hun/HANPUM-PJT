/** 모임 - 필터 */

import { useState } from 'react';
import * as M from '@/components/Style/Meet/MeetFilter.styled';
import * as R from '@/components/Style/Route/RouteListSearchPage.styled';
import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { RouteDetailProps } from '@/models/route';
import FilterTable from '@/components/Meet/FilterTable';
import { Slider } from '@mui/material';
import { colors } from '@/styles/colorPalette';
import ToggleSlider from '@/components/common/ToggleSlider/ToggleSlider';
import Icon from '@/components/common/Icon/Icon';

function MeetFilterPage() {
  const navigate = useNavigate();
  const [routeData, setRouteData] = useState<RouteDetailProps | null>(null);
  const [dateValue, setDateValue] = useState<number>(0);
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
          <M.RouteIconBox>
            <M.ArrowBox>
              <Icon name="IconArrowBlack" size={10} />
            </M.ArrowBox>
          </M.RouteIconBox>
        </M.RouteDateInfoBox>
      </M.RouteDateBox>
      {/* filter - 지역 선택(table) */}
      <M.FilterBox>
        <FilterTable onClick={locationFilterClick} />
      </M.FilterBox>
      <M.ToggleSliderBox>
        <ToggleSlider
          title="일정기간"
          unit="일"
          min={0}
          max={15}
          initialValue={0}
          onChange={(value) => console.log(`소요일차: ${value}일`)}
        />
        <ToggleSlider
          title="모집일자"
          unit="인"
          min={0}
          max={15}
          initialValue={0}
          onChange={(value) => console.log(`모집일자: ${value}인`)}
        />
      </M.ToggleSliderBox>
    </MainPageContainer>
  );
}

export default MeetFilterPage;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
