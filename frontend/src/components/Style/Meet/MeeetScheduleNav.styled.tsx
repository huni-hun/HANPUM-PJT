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
    border: 2px solid #a0a0a0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: #a0a0a0;
  }

  .active {
    border: 2px solid #1a823b;
    color: #1a823b;
  }

  .swiper-slide {
    width: 7.4rem !important;
    height: 3.3rem !important;
  }
`;
