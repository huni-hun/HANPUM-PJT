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
import goyuMY from '../../assets/img/goyuMY.png';
import { SchduleCardProps } from '@/models/schdule';
import BottomTab from '@/components/common/BottomTab/BottomTab';

function ScheduleMainPage() {
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

  /** 내일정 - card 컴포넌트 'n박 nd일' 계산 */
  const calculateTripDay = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const nights = diffDays - 1;
    return `${nights}박 ${diffDays}일`;
  };

  /** 내일정 - card 컴포넌트 'd-day' 계산 */
  const calculateDDay = (startDate: string): string => {
    const today = new Date();
    const start = new Date(startDate);

    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0
      ? `D-${diffDays}`
      : diffDays === 0
        ? 'D-Day'
        : `D+${Math.abs(diffDays)}`;
  };

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const dummtFeedData = {
    routeFeedImg: goyuMY,
    routeUserImg: memberImg,
    routeName: '코스 이름(태종대 전망대)',
    routeContent: '이 코스는 초보자에게 적합합니다.',
  };

  /** feed 더미 데이터 */
  /** === useState (dayData) && (totalDistance) */
  const dummyFeedInfoData = {
    router: '일정',
    feedInfoTitle: '일정 정보',
    proceessDay: 1,
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

  /** 임시 출발일, 도착일 (내일정) */
  const startDate = '2024-08-22';
  const endDate = '2024-08-25';

  const dummyCardData = [
    {
      backgroundImg: scheduleBackgroundImg,
      scheduleTitle: '여행 일정 1',
      departure: '서울',
      arrival: '부산',
      startDate: '2024.08.22(수)',
      endDate: '2024.08.25(일)',
      tripDay: calculateTripDay(startDate, endDate),
      dDay: calculateDDay(startDate),
    },
    {
      backgroundImg: scheduleBackgroundImg,
      scheduleTitle: '여행 일정 1',
      departure: '서울',
      arrival: '부산',
      startDate: '2024.08.22(수)',
      endDate: '2024.08.25(일)',
      tripDay: calculateTripDay(startDate, endDate),
      dDay: calculateDDay(startDate),
    },
    {
      backgroundImg: scheduleBackgroundImg,
      scheduleTitle: '여행 일정 1',
      departure: '서울',
      arrival: '부산',
      startDate: '2024.08.22(수)',
      endDate: '2024.08.25(일)',
      tripDay: calculateTripDay(startDate, endDate),
      dDay: calculateDDay(startDate),
    },
  ];

  /** 모임일정 */
  const dummyMemberData = {
    memberCount: 3,

    members: [
      {
        memberImg: memberImg,
        memberName: '김영우',
      },
      {
        memberImg: memberImg,
        memberName: '장효령',
      },
      {
        memberImg: memberImg,
        memberName: '심채운',
      },
    ],
    /** 배열로 받을 때 (컴포넌트 타입 변경 필요) 
    memberImgs: [memberImg, memberImg, memberImg],
    memberNames: ['김영우', '장효령', '심채운'],*/
  };

  const clickCard = () => {
    navigate('/schedule/detail/mine');
  };

  return (
    <ScheduleMainPageContainer>
      <Header purpose="user" clickBack={() => navigate(-1)} isShadow />

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
      {/* 진행중 tab */}
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

      {/* 내 일정 tab */}
      {isSelected === 'Mine' && (
        <R.Main>
          <R.Overflow>
            {dummyCardData.map((data, index) => (
              <SchduleCard
                key={index}
                backGroundImg={data.backgroundImg}
                scheduleTitle={data.scheduleTitle}
                departure={data.departure}
                arrival={data.arrival}
                startDate={data.startDate}
                endDate={data.endDate}
                tripDay={data.tripDay}
                dDay={data.dDay}
                onClick={clickCard}
              />
            ))}
          </R.Overflow>
        </R.Main>
      )}

      {/* 모임 일정 tab */}
      {isSelected === 'Class' && (
        <R.Main>
          <R.Overflow>
            <R.RouteInfoContainer>
              <Feed routeData={dummtFeedData} isUserContainer />
              <FeedInfo
                feedInfoTitle="모임 일정 정보"
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
                members={dummyMemberData.members}
              />
            </S.ScheduleMainContainer>
          </R.Overflow>
        </R.Main>
      )}
      <BottomTab />
    </ScheduleMainPageContainer>
  );
}

export default ScheduleMainPage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
