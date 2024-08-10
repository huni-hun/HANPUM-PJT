import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: black;
  position: relative;

  .meet_info {
    display: flex;
    gap: 8px;
    position: absolute;
    top: 8px;
    left: 8px;
    &-item {
      color: ${colors.white};
      font-size: 0.8rem;
      display: flex;
      gap: 2.75px;
    }
  }

  .heart {
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .meet_course {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: ${colors.white};
    &-info {
      display: flex;
      align-items: end;
      margin-bottom: 4px;
      &-title {
        font-weight: bold;
        font-size: 1.4rem;
      }
      &-day {
        width: 3rem;
        height: 1rem;
        border-radius: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${colors.main};
        font-size: 0.6rem;
      }
    }

    .course {
      display: flex;
      align-items: end;
      gap: 2px;
      color: ${colors.white};
      &-place {
        display: flex;
        align-items: center;
        gap: 6px;
        &_item {
          font-size: 1rem;
          font-weight: bold;
        }
      }

      &-km {
        font-size: 0.6rem;
      }
    }
  }
`;
