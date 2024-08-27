import React, { useEffect, useState } from 'react';
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
  startDate: string | null;
  endDate: string | null;
}

interface RangeCalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (range: Range) => void;
}

// 날짜를 YYYY-MM-DD 형식으로 변환하는 함수
const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 변환
  const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 변환
  return `${year}-${month}-${day}`;
};

const RangeCalendar = ({
  startDate,
  endDate,
  onDateChange,
}: RangeCalendarProps) => {
  const [internalRange, setInternalRange] = useState<Range>({
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  });

  useEffect(() => {
    setInternalRange({
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }, [startDate, endDate]);

  const handleSet = (event: any) => {
    const { start, end } = event.value;

    // start와 end가 Date 객체인지 확인합니다.
    if (start instanceof Date && end instanceof Date) {
      // 날짜를 YYYY-MM-DD 형식으로 변환
      const formattedStart = formatDate(start);
      const formattedEnd = formatDate(end);

      // onDateChange 호출
      onDateChange({
        startDate: formattedStart,
        endDate: formattedEnd,
      });

      console.log('Start Date:', formattedStart);
      console.log('End Date:', formattedEnd);
    } else {
      console.error('Expected Date objects but got:', start, end);
    }
  };

  return (
    <CustomCalendarWrapper>
      <Datepicker
        display="inline"
        select="range" // 날짜 범위 선택을 활성화
        touchUi={true} // 터치 UI 사용
        controls={['calendar']} // 캘린더 컨트롤만 표시
        onSet={handleSet} // 날짜 선택 시 호출
        value={{
          start: startDate ? new Date(startDate) : null,
          end: endDate ? new Date(endDate) : null,
        }}
      />
    </CustomCalendarWrapper>
  );
};

export default RangeCalendar;
