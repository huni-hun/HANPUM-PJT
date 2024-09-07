import { useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
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

function DetailMineSchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  /** 멤버 아이디 넘겨받기 */
  const location = useLocation();
  const { groupMemberId } = location.state || {};
  /** 헤더 설정 열기 */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const dummtFeedData = {
    routeFeedImg: goyuMY,
    routeUserImg: memberImg,
    routeName: '코스 이름(태종대 전망대)',
    routeContent: '이 코스는 초보자에게 적합합니다.',
    /** 출발일, 도착일 */
    startDate: '2024.08.04',
    endDate: '2024.08.16',
    /** 모집마감, 모집인원, 관심 (초깃값 0으로 해줘야해용) */
    memberCount: 10,
    totalMember: 20,
    likeCount: 1,
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

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    navigate(`/meet/edit`, {
      state: { groupMemberId },
    });
  };

  /** 바텀탭 - 삭제 클릭시 */
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <MainPageContainer>
      <Header purpose="result" title="D-16" clickBack={() => navigate(-1)} />

      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed routeData={dummtFeedData} isUserContainer meetRouter />
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
        </R.Overflow>
      </R.Main>
      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
          route="모임필터"
          bsTypeText={'설정'}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainPageContainer>
  );
}

export default DetailMineSchedulePage;

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;
