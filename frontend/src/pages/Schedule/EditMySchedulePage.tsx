import { useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
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
import BottomTab from '@/components/common/BottomTab/BottomTab';
import RangeCalendar from '@/components/common/Calendar/RangeCalendar';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import { PutSchedule } from '@/api/schedule/PUT';
import { toast } from 'react-toastify';

interface ScheduleData {
  courseId: number;
  title: string;
  startDate: string;
}

function EditMySchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  /** 스케줄 아이디, dday 넘겨받기 */
  const location = useLocation();
  const { scheduleId } = location.state || {};
  /** 헤더 설정 열기 */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  /** 달력 선택 start, endData 쓸 수 있는거 */
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });
  /** 날짜 선택 시 vh 늘어나면서 data picker,map 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);
  const [putSchedule, setPutSchedule] = useState<ScheduleData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const postAddSchedule = async () => {
    try {
      const startDate = dates.startDate;

      // startDate를 "YYYYMMDD" 형식으로 변환
      const formattedDate = startDate.replace(/-/g, '');

      const response = await PutSchedule(scheduleId, formattedDate);

      if (response && response.data.status === 'SUCCESS') {
        setPutSchedule(response.data);
        navigate('/schedule/main');
      } else if (response && response.data.status === 'ERROR') {
        toast.error(response.data.message);
        setError('일정 생성에 실패했습니다.');
      }
    } catch (error) {
      toast.error('일정 생성에 실패했습니다.');
    }
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

  // 날짜가 변경될 때 호출되는 함수
  const handleDateChange = (range: {
    startDate: string | null;
    endDate: string | null;
  }) => {
    setDates({
      startDate: range.startDate || '',
      endDate: range.endDate || '',
    });
  };

  const handlerExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  /** 하위 컴포넌트 클릭시 vh 변경되는 이벤트 막기 */
  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  console.log(scheduleId, '??');

  /** 임시 데이터 */
  const dummyData = {
    date: [
      { title: '출발일', content: dates.startDate || '-' },
      { title: '도착일', content: dates.endDate || '-' },
    ],
    point: [
      { title: '출발지', content: 'data' },
      { title: '도착지', content: 'data' },
    ],
  };

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="route-detail"
        // title={dDay}
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
        <S.DatePickerEditWrap>
          <S.DateWrap $isExpanded={isExpanded} onClick={handlerExpanded}>
            {/* vh 활성화 되었을 때 캘린더 */}
            {isExpanded ? (
              <div onClick={handleStopEvent}>
                <S.H3>출발일을 선택해주세요.</S.H3>
                <S.DatePicker>
                  <RangeCalendar
                    startDate={dates.startDate}
                    endDate={dates.endDate}
                    onDateChange={handleDateChange}
                  />
                </S.DatePicker>
                <S.NextBtn>
                  <Button
                    width={20}
                    height={5}
                    fc="ffffff"
                    bc={colors.main}
                    radius={0.7}
                    fontSize={1.6}
                    children="변경"
                    color="#ffffff"
                    onClick={postAddSchedule}
                  />
                </S.NextBtn>
              </div>
            ) : (
              <>
                <S.H3>일정</S.H3>
                <S.RoutePointWrap>
                  {dummyData.date.map((date, index) => (
                    <S.RoutePointSection key={index}>
                      <S.RoutePointTitle>{date.title}</S.RoutePointTitle>
                      <S.RoutePointContent>{date.content}</S.RoutePointContent>
                    </S.RoutePointSection>
                  ))}
                </S.RoutePointWrap>
              </>
            )}
          </S.DateWrap>
        </S.DatePickerEditWrap>
      </R.Overflow>
      <BottomTab />
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
