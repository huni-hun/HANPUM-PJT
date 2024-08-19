import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const CalenderContainer = styled.div`
  width: 100%;
  /* height: 22.8rem; */
  /* padding: 20px 16px 0; */
  box-sizing: border-box;

  .calender {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 29px;
      padding-top: 20px;
      span {
        flex: 1;
        text-align: center;
      }
    }
    &-body {
      display: flex;
      width: 100%;
      height: 16.7rem;
      .mbsc-datepicker,
      .mbsc-flex-col,
      .mbsc-datepicker-inline,
      .mbsc-ios,
      .mbsc-datepicker-control-date {
        font-size: 1.6rem;
        border: none;
      }
      .mbsc-datepicker-inline {
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
      }

      .mbsc-scroller-wheel-line {
        background-color: rgba(26, 130, 59, 0.1);
      }
    }

    .mbsc-ios.mbsc-datepicker-inline {
    }

    .mbsc-scroller-wheel-group {
      justify-content: space-between;
    }
  }
`;

export const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 12px;

  .skeleton-body {
    width: 100%;
    height: 100%;
    background-color: ${colors.grey3};
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;

    border-radius: 12px;
  }

  .skeleton-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150px;
    width: 150px;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 40%,
      rgba(255, 255, 255, 0) 80%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      left: -150px;
    }
    100% {
      left: 100%;
    }
  }
`;
