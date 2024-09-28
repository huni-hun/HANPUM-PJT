import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/AddSchdulePage.styled';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Header from '@/components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import RangeCalendar from '../../components/common/Calendar/RangeCalendar';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button/Button';
import { colors } from '@/styles/colorPalette';
import { CreateMeetRequestDto } from '@/models/meet';
import styled from 'styled-components';

interface ScheduleData {
  courseId: number;
  title: string;
  startDate: string;
}

function MeetAddDeadLinePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, startDate, recruitmentPeriod, isEdit } =
    location.state || {};
  /** 날짜 선택 시 vh 늘어나면서 data picker,map 활성화 */
  const [isExpanded, setIsExpanded] = useState(false);

  const [meetRequest, setMeetRequest] = useState<Partial<CreateMeetRequestDto>>(
    () => {
      // 로컬 스토리지에서 이전에 저장된 상태를 가져와 초기화
      const savedRequest = localStorage.getItem('meetRequest');
      return savedRequest ? JSON.parse(savedRequest) : {};
    },
  );

  const [selectedDate, setSelectedDate] = useState<string>(
    meetRequest?.recruitmentPeriod || startDate || recruitmentPeriod || '',
  );

  useEffect(() => {
    if (recruitmentPeriod) {
      setSelectedDate(recruitmentPeriod.trim());
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

  const postMeetDeadSchedule = (recruitmentPeriod: string) => {
    if (recruitmentPeriod) {
      const updatedRequest = { ...meetRequest, recruitmentPeriod };

      // 로컬 스토리지에 업데이트된 상태 저장
      localStorage.setItem('meetRequest', JSON.stringify(updatedRequest));

      const baseState = {
        courseId,
        startDate,
        recruitmentPeriod: recruitmentPeriod,
      };

      if (isEdit) {
        // 수정 시 meetRequest와 함께 상태 전환
        navigate('/meet/edit', {
          state: {
            ...baseState,
            meetRequest: updatedRequest,
          },
        });
      } else {
        navigate('/meet/addMain', { state: baseState });
      }
    } else {
      toast.error('날짜를 선택해주세요!');
    }
  };

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="title"
        title="모집 마감일을 등록해주세요"
        clickBack={() => navigate(-1)}
        $isShadow
      />
      <S.SchduleContainer>
        <S.DateWrap $isExpanded={!isExpanded}>
          <div>
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
            onClick={() => postMeetDeadSchedule(selectedDate)}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </ScheduleMainPageContainer>
  );
}

export default MeetAddDeadLinePage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
