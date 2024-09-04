import { useEffect, useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { RunningScheduleProps, SchduleCardProps } from '@/models/schdule';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import MeetModal from '@/components/Meet/MeetModal';
import { getMyScheduleDetailData } from '@/api/schedule/GET';

function DetailMineSchedulePage() {
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
  /** 데이터 가져오기 */
  const [myScheduleListData, setMyScheduleListData] =
    useState<RunningScheduleProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    navigate('/schedule/edit');
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
  const feedData = {
    routeFeedImg: myScheduleListData?.backgroundImg || goyuMY,
    routeUserImg: memberImg,
    routeName: myScheduleListData?.title,
    routeContent: myScheduleListData?.content,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyScheduleDetailData(scheduleId);

        if (response && response.status === 'SUCCESS') {
          setMyScheduleListData(response.data);
        } else {
          setError('데이터 가져오기 실패');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /** 내일정 - card 컴포넌트 'n박 n일' 계산 */
  const formatDate = (dateStr: string): string => {
    // Convert "YYYYMMDD" to "YYYY-MM-DD"
    const formattedDateStr = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;

    const date = new Date(formattedDateStr);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${weekday})`;

    return formattedDate;
  };

  /** n박 n일 */
  const calculateTripDay = (startDate: string, endDate: string): string => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const start = new Date(formattedStartDate);
    const end = new Date(formattedEndDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid dates';
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const nights = diffDays > 0 ? diffDays - 1 : 0; // 날짜가 같은 경우 0박으로 처리
    return `${nights}박 ${diffDays === 0 ? 1 : diffDays}일`; // 같은 날짜일 경우 1일로 처리
  };

  const dayData =
    myScheduleListData?.scheduleDayResDtoList?.map((day, index) => ({
      dayNum: index + 1,
    })) || [];

  const formattedDistance = myScheduleListData?.totalDistance
    ? parseFloat(parseFloat(myScheduleListData.totalDistance).toFixed(1))
    : 0;

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
          <Feed routeData={feedData} isUserContainer />
          <FeedInfo
            feedInfoTitle="일정 정보"
            departuresPlace={myScheduleListData?.startPoint}
            arrivalsPlace={myScheduleListData?.endPoint}
            startDate={formatDate(myScheduleListData?.startDate || '')}
            endDate={formatDate(myScheduleListData?.endDate || '-')}
            totalDistance={formattedDistance}
            dayData={dayData}
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
      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
          route="일정"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {isDeleteModalOpen && (
        <MeetModal
          onClick={delteModalClose}
          title="삭제하시겠어요?"
          content={'삭제하면 복구가 어렵습니다.'}
        />
      )}
    </ScheduleMainPageContainer>
  );
}

export default DetailMineSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
