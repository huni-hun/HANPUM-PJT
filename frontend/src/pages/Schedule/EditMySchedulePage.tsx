import { useEffect, useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
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
import BottomTab from '@/components/common/BottomTab/BottomTab';
import RangeCalendar from '@/components/common/Calendar/RangeCalendar';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import { PutSchedule } from '@/api/schedule/PUT';
import { toast } from 'react-toastify';
import { getMyScheduleDetailData } from '@/api/schedule/GET';

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
  /** 데이터 가져오기 */
  const [myScheduleListData, setMyScheduleListData] =
    useState<RunningScheduleProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
  }, [myScheduleListData]);

  const feedData = {
    routeFeedImg: myScheduleListData?.backgroundImg || goyuMY,
    routeUserImg: memberImg,
    routeName: myScheduleListData?.title,
    routeContent: myScheduleListData?.content,
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

  const dayData =
    myScheduleListData?.scheduleDayResDtoList?.map((day, index) => ({
      dayNum: index + 1,
    })) || [];

  const formattedDistance = myScheduleListData?.totalDistance
    ? Number(myScheduleListData.totalDistance.toFixed(1)) // toFixed()의 결과를 숫자로 변환
    : 0;

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
          <Feed routeData={feedData} isUserContainer />
          <FeedInfo
            feedInfoTitle="일정 정보"
            startPoint={myScheduleListData?.startPoint}
            endPoint={myScheduleListData?.endPoint}
            startDate={formatDate(myScheduleListData?.startDate || '')}
            endDate={formatDate(myScheduleListData?.endDate || '-')}
            totalDistance={formattedDistance}
            dayData={dayData}
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
