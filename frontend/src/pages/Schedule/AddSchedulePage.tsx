import { useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';

import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

import Calendar from '../../components/common/Calendar/RangeCalendar';
import BaseButton from '@/components/common/BaseButton';

function AddSchedulePage() {
  const navigate = useNavigate();
  const BtnClick = () => {
    /** 일정추가 버튼 -> move addSchedule.tsx */
  };

  const [isSelected, setIsSelected] = useState<String>('Mine');

  /** select box 관련 */
  const [isOpen, setIsOpen] = useState(false);
  const selectList = ['Option 1', 'Option 2'];
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    console.log(`Item clicked: ${event.currentTarget.textContent}`);
  };
  /** 경로 설정 btn 관련 */
  const [activeButton, setActiveButton] = useState<boolean>(false);
  /** 날짜 선택 시 vh 늘어나면서 data picker 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);

  const RouteSetBtnClick = () => () => {
    setActiveButton(!activeButton);
  };

  /** 임시 데이터 */
  const routeData = [
    { title: '출발지', content: 'data' },
    { title: '도착지', content: 'data' },
  ];

  const handleDatePickClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

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
        <S.DateWrap isExpanded={isExpanded} onClick={handleDatePickClick}>
          {isExpanded ? (
            <div onClick={handleStopEvent}>
              <S.H3>출발일을 선택해주세요.</S.H3>
              <S.DatePicker>
                <Calendar />
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
              <S.H3>날짜</S.H3>
            </>
          )}
        </S.DateWrap>

        <S.RouteWrap isExpanded={isExpanded} onClick={handleDatePickClick}>
          <S.RouteTop>
            <S.H3>경로</S.H3>
            <S.RoutePointWrap>
              {routeData.map((point, index) => (
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
              <S.RouteMapWrap onClick={handleStopEvent} isExpanded={isExpanded}>
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
