import React, { useState } from 'react';
import { Datepicker, setOptions } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { CustomCalendarWrapper } from './CustomCalendar.styled';

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
  startDate: string | null;
  endDate: string | null;
  onDateChange: (range: Range) => void;
  isPickDate?: boolean;
  totalDays?: number;
}

const formatDate = (date: Date | null): string | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const RangeCalendar = ({
  startDate,
  endDate,
  onDateChange,
  totalDays,
}: RangeCalendarProps) => {
  const [internalRange, setInternalRange] = useState<Range>({
    startDate,
    endDate,
  });

  const handleChange = (event: any) => {
    const { value } = event;
    let start: Date | null = null;
    let end: Date | null = null;

    // 출발일 선택
    start = value ? new Date(value) : null;

    // 출발일이 선택되고 totalDays가 있을 경우 도착일 계산
    if (start && totalDays) {
      const calculatedEndDate = new Date(start);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + totalDays - 1);
      end = calculatedEndDate;
    }

    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    // 날짜가 변경되었을 때 업데이트
    if (
      formattedStart !== internalRange.startDate ||
      formattedEnd !== internalRange.endDate
    ) {
      setInternalRange({
        startDate: formattedStart,
        endDate: formattedEnd,
      });

      onDateChange({
        startDate: formattedStart,
        endDate: formattedEnd,
      });
    }
  };

  // 오늘 날짜를 자정으로 설정(오늘날짜 선택 안되는 버그)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <CustomCalendarWrapper>
      <Datepicker
        display="inline"
        select="range"
        touchUi={true}
        controls={['calendar']}
        onChange={handleChange}
        value={[
          startDate ? new Date(startDate) : undefined,
          endDate ? new Date(endDate) : undefined,
        ]}
        min={today}
        invalid={[
          {
            start: new Date(1900, 0, 1),
            end: new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() - 1,
            ),
          },
        ]}
      />
    </CustomCalendarWrapper>
  );
};

export default RangeCalendar;
