import { useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Icon from '@/components/common/Icon/Icon';
import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import ProgressSchedule from '@/components/Schedule/ProgressSchedule';
import WeatherSchedule from '@/components/Schedule/WeatherSchedule';
import Error from '../../assets/icons/Error.svg';
import MeetMember from '@/components/Schedule/MeetMember';
import memberImg from '../../assets/img/memberImg.svg';
import SchduleCard from '@/components/Schedule/SchduleCard';
import scheduleBackgroundImg from '../../assets/img/scheduleBackground.png';
import { SchduleCardProps } from '@/models/schdule';

// import PlusIcon from '../../PlusIcon.svg';

function DetailMineSchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<String>('Mine');
  const [cardData, setCardData] = useState<SchduleCardProps>({
    backGroundImg: '',
    scheduleTitle: '',
    departure: '',
    arrival: '',
    startDate: '',
    endDate: '',
    tripDay: '',
  });

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const dummtFeedData = {
    routeName: '코스 이름(태종대 전망대)',
    routeContent: '이 코스는 초보자에게 적합합니다.',
  };

  /** feed 더미 데이터 */
  /** === useState (dayData) && (totalDistance) */
  const dummyFeedInfoData = {
    router: '일정',
    feedInfoTitle: '일정 정보',
    /** 출발지 , 도착지 */
    departuresPlace: '태종대 전망대',
    arrivalsPlace: '태종대 전망대',
    /** 출발일, 도착일 */
    startDate: '2024.08.04',
    endDate: '2024.08.16',
    /** 거리 */
    currentDistance: 100,
    totalDistance: 200,
    dayData: [{ dayNum: 1 }, { dayNum: 2 }, { dayNum: 3 }],
    /** 오늘 일정 달성률 퍼센트 */
    percent: 30,
  };

  return (
    <ScheduleMainPageContainer>
      <Header purpose="result" title="D-16" clickBack={() => navigate(-1)} />

      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed routeData={dummtFeedData} />
            <FeedInfo
              feedInfoTitle="일정 정보"
              departuresPlace={dummyFeedInfoData.departuresPlace}
              arrivalsPlace={dummyFeedInfoData.arrivalsPlace}
              startDate={dummyFeedInfoData.startDate}
              endDate={dummyFeedInfoData.endDate}
              totalDistance={dummyFeedInfoData.totalDistance}
              dayData={dummyFeedInfoData.dayData}
            />
          </R.RouteInfoContainer>

          {/* 지도 및 하위 컴포넌트 container */}
          <R.RouteDetailInfoContainer>
            {/* <RouteDetailInfo
          selected={selected}
          selectedDay={selectedDay}
          latitude={latitude}
          longitude={longitude}
          dayData={dayData}
          attractions={attractions}
          setLoading={setLoading}
          setSelectedDay={setSelectedDay}
        /> */}
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
    </ScheduleMainPageContainer>
  );
}

export default DetailMineSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 29.5rem;
  }
`;
