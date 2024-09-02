import { useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { SchduleCardProps } from '@/models/schdule';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import MeetModal from '@/components/Meet/MeetModal';

function EditMySchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  /** 스케줄 아이디, dday 넘겨받기 */
  const location = useLocation();
  const { scheduleId, dDay } = location.state || {};
  /** 헤더 설정 열기 */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    // navigate('/scheduleEdit');
  };

  /** 바텀탭 - 삭제 클릭시 */
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  /** 모달 끄는 함수 */
  const delteModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsOpen(false);
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
      <Header
        purpose="route-detail"
        title={dDay}
        back={true}
        clickBack={() => navigate(-1)}
        clickOption={() => {
          setIsOpen(true);
          setBsType('설정');
        }}
      />

      <R.Overflow>
        <R.RouteInfoContainer>
          <Feed routeData={dummtFeedData} isUserContainer />
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
      </R.Overflow>
    </ScheduleMainPageContainer>
  );
}

export default EditMySchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
