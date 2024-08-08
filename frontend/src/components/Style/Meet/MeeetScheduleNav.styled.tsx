import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MeetScheduleNav = styled.div`
  padding-left: 16px;

  .day-box {
    display: flex;
    align-items: center;
    padding: 16px 0;
  }

  .day {
    width: 7.4rem;
    height: 3.3rem;
    border-radius: 100px;
    border: 2px solid ${colors.grey2};
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: ${colors.grey2};
  }

  .active {
    border: 2px solid ${colors.green};
    color: ${colors.green};
  }

  .swiper-slide {
    width: 7.4rem !important;
    height: 3.3rem !important;
  }
`;
