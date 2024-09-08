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
  /** coursId add.main에서 가져오기 */
  const location = useLocation();
  const { courseId, startDate, recruitmentPeriod, isEdit } =
    location.state || {};

  /** 날짜 선택 시 vh 늘어나면서 data picker,map 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    startDate || recruitmentPeriod || '',
  );

  /** 달력 선택 start, endData 쓸 수 있는거 */
  const [dates, setDates] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (recruitmentPeriod) {
      setSelectedDate(recruitmentPeriod.trim() || '');
    }
  }, [recruitmentPeriod]);

  // 날짜가 변경될 때 호출되는 함수
  const handleDateChange = (range: {
    startDate: string | null;
    endDate: string | null;
  }) => {
    if (range.startDate) {
      setSelectedDate(range.startDate);
    }
  };

  const postMeetDeadSchdule = (recruitmentPeriod: string) => {
    if (startDate !== '') {
      navigate(isEdit ? '/meet/edit' : '/meet/addMain', {
        state: {
          courseId,
          startDate,
          recruitmentPeriod: recruitmentPeriod,
        },
      });
    } else {
      toast.error('날짜를 선택해주세요!');
    }
  };

  /** 하위 컴포넌트 클릭시 vh 변경되는 이벤트 막기 */
  const handleStopEvent = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
        <S.DateWrap $isExpanded={!isExpanded}>
          {/* vh 활성화 되었을 때 캘린더 */}

          <div onClick={handleStopEvent}>
            <S.H3>마감일을 선택해주세요.</S.H3>
            <S.DatePicker>
              <RangeCalendar
                startDate={selectedDate}
                endDate={selectedDate}
                onDateChange={handleDateChange}
                isPickDate={true}
              />
            </S.DatePicker>
          </div>
        </S.DateWrap>
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
            onClick={() => postMeetDeadSchdule(selectedDate)}
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
