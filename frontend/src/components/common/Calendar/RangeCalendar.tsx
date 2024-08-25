import React from 'react';
import { Datepicker, setOptions } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { CustomCalendarWrapper } from './CustomCalendar.styled';

// Mobiscroll 설정
setOptions({
  locale: 'ko',
  lang: 'ko',
  theme: 'ios',
  themeVariant: 'light',
});

const RangeCalendar = () => {
  return (
    <CustomCalendarWrapper>
      <Datepicker
        display="inline"
        select="range" // 날짜 범위 선택을 활성화
        touchUi={true} // 터치 UI 사용
        controls={['calendar']} // 캘린더 컨트롤만 표시
      />
    </CustomCalendarWrapper>
  );
};
export default RangeCalendar;
