// CustomCalendar.styled.js
import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

// Mobiscroll CSS 클래스 오버라이드
export const CustomCalendarWrapper = styled.div`
  /* 전체 배경색 변경 */
  .mbsc-datepicker {
    background-color: #f5f5f5;
  }

  /* 캘린더 헤더 숨기기 */
  .mbsc-range-control-wrapper {
    display: none;
  }

  /* 버튼 색상 변경 */
  .mbsc-ios.mbsc-calendar-button.mbsc-button {
    color: ${colors.grey4};
  }

  /* 선택된 날짜 스타일 */
  .mbsc-ios.mbsc-selected .mbsc-calendar-cell-text {
    color: ${colors.white};
    border-color: ${colors.main};
    background-color: ${colors.main};
  }

  /* 년월 상단 날짜 flex (필요에 따라 수정) */
  .mbsc-flex-1-1 {
    /* 스타일 수정 */
  }

  /** 달력 테두리 없애기 */
  .mbsc-ios.mbsc-datepicker-inline {
    border-bottom: 0px;
    border-top: 0px;
  }

  /** 기간 설정했을 때 연두색 */
  .mbsc-ios.mbsc-range-day:after {
    background-color: #e8f3eb;
  }

  /** 오늘 날짜 색 변경 */
  .mbsc-ios.mbsc-calendar-today,
  .mbsc-ios.mbsc-calendar-week-nr {
    color: ${colors.main};
  }

  /** 202n 년 n월 n일 + arrow 색상 변경 */
  .mbsc-ios.mbsc-calendar-button.mbsc-button {
    color: #5d5d5d;
  }
`;
