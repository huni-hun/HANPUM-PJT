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
}: RangeCalendarProps) => {
  const [internalRange, setInternalRange] = useState<Range>({
    startDate,
    endDate,
  });

  const handleChange = (event: any) => {
    const { value } = event;
    const start = value && value[0] ? new Date(value[0]) : null;
    const end = value && value[1] ? new Date(value[1]) : null;

    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    //무한렌더링 방지
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
      />
    </CustomCalendarWrapper>
  );
};

export default RangeCalendar;
