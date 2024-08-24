import { colors } from '@/styles/colorPalette';
import { Datepicker } from '@mobiscroll/react';
import styled from 'styled-components';

export const CustomCalendar = styled(Datepicker)`
  /* Datepicker 전체 배경색 변경 */
  .mbsc-datepicker {
    background-color: #f5f5f5;
  }

  /** 캘린더 헤더 스타일링 */
  .mbsc-range-control-wrapper {
    display: none;
  }

  .mbsc-ios.mbsc-calendar-button.mbsc-button {
    color: ${colors.grey4};
  }

  .mbsc-ios.mbsc-selected .mbsc-calendar-cell-text {
    color: ${colors.white};
    border-color: ${colors.main};
    background-color: ${colors.main};
  }

  /** 년월 상단 날짜 flex */
  .mbsc-flex-1-1 {
  }
`;
