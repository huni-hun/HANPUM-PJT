import { useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import Button from '../../components/common/Button/Button';
import Header from '@/components/common/Header/Header';
import MeetInfo from '@/components/Meet/MeetInfo';
import MeetSchedule from '@/components/Meet/MeetSchedule';
import MajorTour from '@/components/Meet/MajorTour';
import Member from '@/components/Meet/Member';
import DummyImg from '../../assets/img/mountain.jpg';
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import { RouteDetailDayProps, RouteDetailProps } from '@/models/route';
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

// import PlusIcon from '../../PlusIcon.svg';

function ScheduleMainPage() {
  const BtnClick = () => {};
  const navigate = useNavigate();

  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [isSelected, setIsSelected] = useState<String>('Mine');
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);

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

  /** 내일정 */

  // const dummyCardData = {
  //   backgroundImg: [
  //     scheduleBackgroundImg,
  //     scheduleBackgroundImg,
  //     scheduleBackgroundImg,
  //   ],
  //   scheduleTitle: ['김영우', '장효령', '심채운'],

  // };
  // const backgroundImageString = dummyCardData.backgroundImg
  //   .map((img) => `url(${img})`)
  //   .join(', ');

  /** 모임일정 */
  const dummyMemberData = {
    memberCount: 3,
    memberImgs: [memberImg, memberImg, memberImg],
    memberNames: ['김영우', '장효령', '심채운'],
  };

  return (
    <ScheduleMainPageContainer>
      <Header purpose="user" clickBack={() => navigate(-1)} />

      <S.SchduleTypeContainer>
        <S.SchduleTypeBox>
          <S.ScheduleType
            isSelected={isSelected === 'Proceeding'}
            onClick={() => {
              setIsSelected('Proceeding');
            }}
          >
            진행중
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'Mine'}
            onClick={() => {
              setIsSelected('Mine');
            }}
          >
            내 일정
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'Class'}
            onClick={() => {
              setIsSelected('Class');
            }}
          >
            모임일정
          </S.ScheduleType>
        </S.SchduleTypeBox>
      </S.SchduleTypeContainer>
      {/* 진행중 */}
      {isSelected === 'Proceeding' && (
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
            {/* 1일차 진행 상황을 확인 + 달성률 ~~ 어쩌구 container */}
            <S.ScheduleMainContainer>
              <ProgressSchedule
                departuresPlace={dummyFeedInfoData.departuresPlace}
                arrivalsPlace={dummyFeedInfoData.arrivalsPlace}
                currentDistance={dummyFeedInfoData.currentDistance}
                totalDistance={dummyFeedInfoData.totalDistance}
                dayData={dummyFeedInfoData.dayData}
                percentage={dummyFeedInfoData.percent}
              />
            </S.ScheduleMainContainer>
            {/* 날씨 + 날씨 메세지 container */}
            <S.ScheduleMainContainer>
              <WeatherSchedule
                weatherIcon={Error}
                message={'warning message'}
              />
            </S.ScheduleMainContainer>
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
      )}

      {/* 내 일정 */}
      {isSelected === 'Mine' && (
        <R.Main>
          <R.Overflow>
            {/* <SchduleCard
              backGroundImg={backgroundImageString}
              scheduleTitle="여행 일정"
              departure="서울"
              arrival="부산"
            /> */}
          </R.Overflow>
        </R.Main>
      )}

      {/* 모임 일정 */}
      {isSelected === 'Class' && (
        <R.Main>
          <R.Overflow>
            <R.RouteInfoContainer>
              <Feed routeData={dummtFeedData} />
              <FeedInfo
                feedInfoTitle="일정 코스"
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
            {/* 모임멤버 */}
            <S.ScheduleMainContainer>
              <MeetMember
                memberCount={dummyMemberData.memberCount}
                memberImgs={dummyMemberData.memberImgs}
                memberNames={dummyMemberData.memberNames}
              />
            </S.ScheduleMainContainer>
          </R.Overflow>
        </R.Main>
      )}
    </ScheduleMainPageContainer>
  );
}

export default ScheduleMainPage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 29.5rem;
  }
`;
