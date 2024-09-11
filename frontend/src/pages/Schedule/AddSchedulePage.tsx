import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';

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

interface ScheduleData {
  courseId: number;
  title: string;
  startDate: string;
}

function AddSchedulePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const routedata = { ...location.state };
  const BtnClick = () => {};
  const [error, setError] = useState<string | null>(null);
  const [postSchedule, setPostSchedule] = useState<ScheduleData | null>(null);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  /** 경로 있을 때만 달력 확성화 */
  const [isRouteValid, setIsRouteValid] = useState(true);

  /** 날짜 선택 시 vh 늘어나면서 data picker,map 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);

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

  const postAddSchedule = async () => {
    try {
      const startDate = dates.startDate;

      // startDate를 "YYYYMMDD" 형식으로 변환
      const formattedDate = startDate.replace(/-/g, '');

      const response = await PostMineSchedule(routedata.id, formattedDate);

      if (response && response.data.status === 'SUCCESS') {
        setPostSchedule(response.data);
        navigate('/schedule/success');
      } else if (response && response.data.status === 'ERROR') {
        toast.error(response.data.message);
        setError('일정 생성에 실패했습니다.');
      }
    } catch (error) {
      toast.error('일정 생성에 실패했습니다.');
    }
  };

  const handlerExpanded = () => {
    if (routedata && Object.keys(routedata).length === 0) {
      setIsRouteValid(false); // 경로가 유효하지 않으면 상태를 업데이트
      toast.error('경로를 먼저 선택해주세요!');
    } else {
      setIsRouteValid(true); // 경로가 유효하면 상태를 true로
      setIsExpanded((prevState) => !prevState); // 달력 확장
    }
  };
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

  useEffect(() => {
    if (
      localStorage.getItem('startDate') !== null &&
      localStorage.getItem('endDate') !== null
    ) {
      const start = localStorage.getItem('startDate');
      const end = localStorage.getItem('endDate');
      setDates({
        startDate: start === null ? '' : start.substring(1, start.length - 1),
        endDate: end === null ? '' : end.substring(1, end.length - 1),
      });
    }
  }, []);

  useEffect(() => {
    if (routedata.ready) {
      setIsMapReady(routedata.ready);
      setLatitude(routedata.latitude);
      setLongitude(routedata.longitude);
    }
  }, [routedata]);

  console.log(routedata, '?');

  /** 하위 컴포넌트 클릭시 vh 변경되는 이벤트 막기 */
  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="title"
        title="일정을 등록해주세요"
        clickBack={() => {
          navigate(-1);
          localStorage.setItem('startDate', '');
          localStorage.setItem('endDate', '');
        }}
        $isShadow
      />
      {/* <S.Container> */}
      <S.SchduleContainer>
        {/* 일정 선택 박스 */}
        <S.DateWrap $isExpanded={isExpanded} onClick={handlerExpanded}>
          {/* vh 활성화 되었을 때 캘린더 */}

          {isExpanded && isRouteValid ? (
            <div onClick={handleStopEvent}>
              <S.H3>출발일을 선택해주세요.</S.H3>
              <S.DatePicker>
                <RangeCalendar
                  startDate={dates.startDate}
                  endDate={dates.endDate}
                  onDateChange={handleDateChange}
                  totalDays={routedata.totalDays}
                />
              </S.DatePicker>
              <S.NextBtn>
                <Button
                  width={20}
                  height={4.8}
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
              <S.RoutePointSection>
                <S.RoutePointTitle>출발지</S.RoutePointTitle>
                <S.RoutePointContent>{routedata.start}</S.RoutePointContent>
              </S.RoutePointSection>
              <S.RoutePointSection>
                <S.RoutePointTitle>도착지</S.RoutePointTitle>
                <S.RoutePointContent>{routedata.end}</S.RoutePointContent>
              </S.RoutePointSection>
            </S.RoutePointWrap>
          </S.RouteTop>
          {isExpanded ? (
            <></>
          ) : (
            <>
              {/* vh 활성화 되었을 때 지도 */}
              <S.RouteMapWrap
                onClick={handleStopEvent}
                $isExpanded={isExpanded}
              >
                <S.RouteMapContent
                  onClick={() => {
                    if (!isMapReady) {
                      navigate('/route/list', { state: { type: 'schedule' } });
                      localStorage.setItem(
                        'startDate',
                        JSON.stringify(dates.startDate),
                      );
                      localStorage.setItem(
                        'endDate',
                        JSON.stringify(dates.endDate),
                      );
                    }
                  }}
                >
                  <S.MapBox>
                    {isMapReady ? (
                      <Map latitude={longitude} longitude={latitude} />
                    ) : null}
                  </S.MapBox>
                </S.RouteMapContent>
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
            fontSize={1.6}
            children="일정 생성"
            color="#ffffff"
            onClick={postAddSchedule}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </ScheduleMainPageContainer>
  );
}

export default AddSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
