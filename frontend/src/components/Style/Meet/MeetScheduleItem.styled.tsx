import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MeetScheduleItemContainer = styled.div`
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  padding: 12px 16px;

  .left {
    margin-top: 3px;
    .green_circle {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: ${colors.green};
      margin-right: 14px;
    }
  }
  .center {
    flex: 1;
    .place_info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      &-top {
        display: flex;
        align-items: end;
        padding-left: 2px;
        gap: 4px;
        &-title {
          font-size: 1.6rem;
          color: ${colors.black};
          font-weight: bold;
        }
        &-category {
          font-size: 1.2rem;
          color: #a0a0a0;
          font-weight: bold;
        }
      }
      &-bottom {
        font-size: 1.2rem;
        color: ${colors.black};
      }
    }
  }
  .right {
    width: 7.3rem;
    height: 7.3rem;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
