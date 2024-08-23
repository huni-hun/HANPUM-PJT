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
    routeName: '산책 코스',
    routeContent: '이 코스는 초보자에게 적합합니다.',
    routeScore: 4.5,
    routeComment: '매우 만족했어요',
  };

  /** feed 더미 데이터 */
  /** === useState (dayData) && (totalDistance) */
  const dummyFeedInfoData = {
    router: '일정',
    feedInfoTitle: '일정 코스',
    startDate: '2024.08.04',
    endDate: '2024.08.16',
    totalDistance: 200,
    dayData: [{ dayNum: 1 }, { dayNum: 2 }, { dayNum: 3 }],
  };

  /** day[index]마다 스케줄 리스트 */
  const dummySchduleListData = [
    {
      id: 1,
      title: '태종대 전망대',
      category: '관광지',
      address: '부산 영도구 전망로 209 1~3층',
      img: DummyImg,
    },
    {
      id: 2,
      title: '해운대 해수욕장',
      category: '해변',
      address: '부산 해운대구 해운대해변로 264',
      img: DummyImg,
    },
    {
      id: 3,
      title: '부산 타워',
      category: '관광지',
      address: '부산 중구 용두산길 37-55',
      img: DummyImg,
    },
  ];

  /** 주요 관광지 더미 데이터 */
  const dummyTourData = [
    { id: 1, place: '제주도', detail: '모슬포항', img: DummyImg },
    { id: 2, place: '부산', detail: '해운대', img: DummyImg },
    { id: 3, place: '강릉', detail: '경포대', img: DummyImg },
    { id: 4, place: '속초', detail: '속초해변', img: DummyImg },
  ];

  /** member 더미 데이터 */
  const dummyMemberData = [
    { id: 1, name: '김땡이', img: '이미지' },
    { id: 2, name: '박땡이', img: '이미지' },
    { id: 3, name: '이땡이', img: '이미지' },
    { id: 4, name: '최땡이', img: '이미지' },
    { id: 5, name: '정땡이', img: '이미지' },
    { id: 6, name: '홍땡이', img: '이미지' },
  ];

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
            isSelected={isSelected === 'class'}
            onClick={() => {
              setIsSelected('class');
            }}
          >
            모임일정
          </S.ScheduleType>
        </S.SchduleTypeBox>
      </S.SchduleTypeContainer>
      {/* <S.ScheduleMainContainer>
        <img src={DummyImg} alt="" />

        <MeetInfo feedData={dummyFeedData} />

        <MeetSchedule scheduleDataList={dummySchduleListData} />

        <MajorTour majorTourData={dummyTourData} />

        <Member memberData={dummyMemberData} />
      </S.ScheduleMainContainer>*/}

      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed routeData={dummtFeedData} />
            <FeedInfo
              router="일정"
              feedInfoTitle="일정 코스"
              startDate={dummyFeedInfoData.startDate}
              endDate={dummyFeedInfoData.endDate}
              totalDistance={dummyFeedInfoData.totalDistance}
              dayData={dummyFeedInfoData.dayData}
            />
          </R.RouteInfoContainer>
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

export default ScheduleMainPage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 29.5rem;
  }
`;
