import { useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';

import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

import Calendar from '../../components/common/Calendar/RangeCalendar';
import BaseButton from '@/components/common/BaseButton';

function AddSchedulePage() {
  const navigate = useNavigate();
  const BtnClick = () => {};

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

  /** 임시 데이터 */
  const dummyData = {
    date: [
      { title: '출발일', content: 'data' },
      { title: '도착일', content: 'data' },
    ],
    point: [
      { title: '출발지', content: 'data' },
      { title: '도착지', content: 'data' },
    ],
  };

  /** 하위 컴포넌트 클릭시 vh 변경되는 이벤트 막기 */
  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  /** vh 확장시켜주는 핸들러 */
  const handlerExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <S.Container>
      <Header
        purpose="title"
        title="일정을 등록해주세요"
        clickBack={() => navigate(-1)}
      />

      <S.SchduleContainer>
        {/* 일정 선택 박스 */}
        <S.DateWrap $isExpanded={isExpanded} onClick={handlerExpanded}>
          {/* vh 활성화 되었을 때 캘린더 */}
          {isExpanded ? (
            <div onClick={handleStopEvent}>
              <S.H3>출발일을 선택해주세요.</S.H3>
              <S.DatePicker>
                <Calendar
                  startDate={dates.startDate ? new Date(dates.startDate) : null}
                  endDate={dates.endDate ? new Date(dates.endDate) : null}
                  onDateChange={handleDateChange}
                />
              </S.DatePicker>

              <BaseButton
                size="small"
                style={{ margin: '1.5rem 0 0 22rem' }}
                onClick={handlerExpanded}
              >
                다음
              </BaseButton>
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
              {dummyData.point.map((point, index) => (
                <S.RoutePointSection key={index}>
                  <S.RoutePointTitle>{point.title}</S.RoutePointTitle>
                  <S.RoutePointContent>{point.content}</S.RoutePointContent>
                </S.RoutePointSection>
              ))}
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
                <S.RouteMapContent>지도</S.RouteMapContent>
              </S.RouteMapWrap>
            </>
          )}
        </S.RouteWrap>
      </S.SchduleContainer>
    </S.Container>
  );
}

export default AddSchedulePage;
