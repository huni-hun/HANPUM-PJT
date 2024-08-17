import { useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import Button from '../../components/common/Button/Button';
import PlusIcon from '../../assets/PlusIcon.svg';
import Icon from '../../components/common/Icon/Icon';
import Select from '../../components/common/Select/Select';
import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';

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
            <>
              <S.H3>출발일을 선택해주세요.</S.H3>
              <S.DatePicker>mui 데이트 피커 쓰게 해주세요</S.DatePicker>
            </>
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
              <S.RouteMapWrap>
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
