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
  isPickDate,
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

    if (isPickDate) {
      start = value ? new Date(value) : null;
      end = null;
    } else {
      start = value && value[0] ? new Date(value[0]) : null;
      end = value && value[1] ? new Date(value[1]) : null;
    }

    if (isPickDate) {
      start = value ? new Date(value) : null;
      // totalDays가 있을 경우 출발일을 기준으로 endDate 계산
      if (start && totalDays) {
        const calculatedEndDate = new Date(start);
        calculatedEndDate.setDate(calculatedEndDate.getDate() + totalDays - 1);
        end = calculatedEndDate;
      }
    }

    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    // 선택된 날짜가 변경되었을 때만 state 업데이트
    if (
      formattedStart !== internalRange.startDate ||
      formattedEnd !== internalRange.endDate
    ) {
      setInternalRange({
        startDate: formattedStart,
        endDate: formattedEnd,
      });

      // 부모 컴포넌트로 변경된 날짜 전달
      onDateChange({
        startDate: formattedStart,
        endDate: formattedEnd,
      });
    }
  };

  const today = new Date();

  return (
    <CustomCalendarWrapper>
      <Datepicker
        display="inline"
        select={isPickDate ? 'date' : 'range'}
        touchUi={true}
        controls={['calendar']}
        onChange={handleChange}
        value={
          isPickDate
            ? [startDate ? new Date(startDate) : undefined]
            : [
                startDate ? new Date(startDate) : undefined,
                endDate ? new Date(endDate) : undefined,
              ]
        }
        min={today}
        invalid={[
          {
            start: new Date(1900, 0, 1),
            end: today,
          },
        ]}
      />
    </CustomCalendarWrapper>
  );
};

export default RangeCalendar;
