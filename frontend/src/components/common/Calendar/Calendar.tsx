import { Datepicker, setOptions } from '@mobiscroll/react';
import React from 'react';
import { CustomCalendar } from './CustomCalendar.styled';

// Mobiscroll 설정
setOptions({
  locale: 'ko',
  lang: 'ko',
});

const Calendar = () => {
  return (
    <CustomCalendar select="range" display="inline" themeVariant="light" />
  );
};

export default Calendar;
