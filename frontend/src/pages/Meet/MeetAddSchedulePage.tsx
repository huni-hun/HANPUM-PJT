import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import noImage from '../../assets/img/noInterest.png';

import Calendar from '../../components/common/Calendar/RangeCalendar';
import BaseButton from '@/components/common/BaseButton';
import RangeCalendar from '../../components/common/Calendar/RangeCalendar';
import { PostMineSchedule } from '@/api/schedule/POST';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import Map from '@/components/common/Map/Map';
import Text from '@/components/common/Text';

interface ScheduleData {
  courseId: number;
  title: string;
  startDate: string;
}

function MeetAddSchedulePage() {
  const navigate = useNavigate();
  const BtnClick = () => {};
  const [error, setError] = useState<string | null>(null);
  const [postSchedule, setPostSchedule] = useState<ScheduleData | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  /** coursId add.main에서 가져오기 */
  const location = useLocation();
  const {
    courseId,
    startDate,
    recruitmentPeriod,
    start,
    end,
    ready,
    lat,
    lon,
    totalDays,
  } = location.state || {};
  /** 날짜 선택 시 vh 늘어나면서 data picker,map 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);
  /** 경로 있을 때만 달력 확성화 */
  const [isRouteValid, setIsRouteValid] = useState(true);
  /** 달력 선택 start, endData 쓸 수 있는거 */
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

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
  const postMeetSchedule = (
    courseId: number,
    startDate: string,
    endDate: string,
  ) => {
    if (startDate !== '') {
      localStorage.setItem('startD', '');
      localStorage.setItem('endD', '');
      navigate(`/meet/addMain`, {
        state: {
          courseId,
          startDate,
          endDate,
          recruitmentPeriod,
          start,
          end,
        },
      });
    } else {
      toast.error('날짜를 선택해주세요!');
    }
  };

  const handlerExpanded = () => {
    if (!isMapReady) {
      // routedata가 없거나 ready가 false인 경우
      setIsRouteValid(false);
      toast.error('경로를 먼저 선택해주세요!');
    } else {
      setIsRouteValid(true);
      setIsExpanded((prevState) => !prevState); // 달력 확장
    }
  };

  /** 일정 + 경로 제목 데이터 (선택 후 들어가는 부분), 걍 귀찮아서 더미데이터라고 썼어요 */
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

  useEffect(() => {
    if (
      localStorage.getItem('startD') !== null &&
      localStorage.getItem('endD') !== null
    ) {
      const start = localStorage.getItem('startD');
      const end = localStorage.getItem('endD');
      setDates({
        startDate: start === null ? '' : start.substring(1, start.length - 1),
        endDate: end === null ? '' : end.substring(1, end.length - 1),
      });
    }
  }, []);

  useEffect(() => {
    if (ready) {
      setIsMapReady(ready);
      setLatitude(lat);
      setLongitude(lon);
    }
  }, [ready]);

  /** 하위 컴포넌트 클릭시 vh 변경되는 이벤트 막기 */
  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleRouteStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (!isMapReady) {
      navigate('/route/list', {
        state: {
          type: 'meet',
          startDate: startDate,
          recruitmentPeriod: recruitmentPeriod,
        },
      });
      localStorage.setItem('startD', JSON.stringify(dates.startDate));
      localStorage.setItem('endD', JSON.stringify(dates.endDate));
    }
  };

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="title"
        title="일정을 등록해주세요"
        clickBack={() => navigate(-1)}
        $isShadow
      />
      {/* <S.Container> */}
      <S.SchduleContainer>
        {/* 일정 선택 박스 */}
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
                  totalDays={totalDays}
                />
              </S.DatePicker>
              <S.NextBtn>
                <Button
                  width={20}
                  height={4}
                  fc="ffffff"
                  bc={colors.main}
                  radius={0.7}
                  fontSize={1.6}
                  children="다음"
                  color="#ffffff"
                  onClick={handlerExpanded}
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
        <S.RouteWrap $isExpanded={isExpanded} onClick={handlerExpanded}>
          {/* 경로선택 박스 */}
          <S.RouteTop>
            <S.H3>경로</S.H3>
            <S.RoutePointWrap>
              <S.RoutePointSection key={1}>
                <S.RoutePointTitle>출발지</S.RoutePointTitle>
                <S.RoutePointContent>
                  {start != null ? start : ''}
                </S.RoutePointContent>
              </S.RoutePointSection>
              <S.RoutePointSection key={2}>
                <S.RoutePointTitle>도착지</S.RoutePointTitle>
                <S.RoutePointContent>
                  {end != null ? end : ''}
                </S.RoutePointContent>
              </S.RoutePointSection>
            </S.RoutePointWrap>
          </S.RouteTop>
          {isExpanded ? (
            <></>
          ) : (
            <>
              {/* vh 활성화 되었을 때 지도 */}
              <S.RouteMapWrap
                onClick={handleRouteStopEvent}
                $isExpanded={isExpanded}
              >
                <S.MapBox>
                  {isMapReady ? (
                    <Map latitude={longitude} longitude={latitude} />
                  ) : (
                    <S.NoDataRouteWrap>
                      <img src={noImage} alt="" />
                      <Text
                        $bold={true}
                        $typography="t14"
                        color="grey2"
                        style={{ marginTop: '24px' }}
                      >
                        클릭해서 경로를 설정하세요.
                      </Text>
                    </S.NoDataRouteWrap>
                  )}
                </S.MapBox>
              </S.RouteMapWrap>
            </>
          )}
        </S.RouteWrap>
      </S.SchduleContainer>
      {/* </S.Container> */}
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={30}
            height={6}
            fc="ffffff"
            bc={colors.main}
            radius={0.7}
            fontSize={1.8}
            children="등록"
            color="#ffffff"
            onClick={() =>
              postMeetSchedule(courseId, dates.startDate, dates.endDate)
            }
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </ScheduleMainPageContainer>
  );
}

export default MeetAddSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
