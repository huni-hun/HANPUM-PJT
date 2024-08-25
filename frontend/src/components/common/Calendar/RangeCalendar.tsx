import React, { useState } from 'react';
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

interface Range {
  startDate: Date | null;
  endDate: Date | null;
}

interface RangeCalendarProps {
  onDateChange: (range: Range) => void;
}

const RangeCalendar = ({ onDateChange }: RangeCalendarProps) => {
  const [range, setRange] = useState<Range>({ startDate: null, endDate: null });

  const handleSet = (event: any) => {
    const { start, end } = event.value;

    // start와 end가 Date 객체인지 확인
    console.log('Start Date:', start);
    console.log('End Date:', end);

    // start와 end가 Date 객체가 아닐 경우 처리
    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    const newRange = {
      startDate,
      endDate,
    };

    setRange(newRange);
    onDateChange(newRange); // 날짜 범위 변경 시 부모 컴포넌트로 전달
  };

  return (
    <CustomCalendarWrapper>
      <Datepicker
        display="inline"
        select="range" // 날짜 범위 선택을 활성화
        touchUi={true} // 터치 UI 사용
        controls={['calendar']} // 캘린더 컨트롤만 표시
        onSet={handleSet} // 날짜 선택 시 호출
      />
    </CustomCalendarWrapper>
  );
};

export default RangeCalendar;
