import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

interface ProgressProps {
  percentage: number;
}

export const Container = styled.div`
  width: 100%;
  padding: 16px 16px 12px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-top: 24px;
  border-radius: 20px;
  background-color: ${colors.white};
  margin-bottom: 24px;

  .line {
    width: 100%;
    height: 1px;
    background-color: ${colors.grey3};
    margin: 12px 0 15px;
  }

  .map {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.grey3};
    height: 7.1rem;
    border-radius: 12px;
    span {
      font-size: 1.2rem;
    }
  }
`;

export const MainScheduleTop = styled.div`
  display: flex;
  justify-content: space-between;

  .main_schedule-top-left {
    display: flex;

    &_title {
      margin-left: 8px;
      display: flex;
      flex-direction: column;
      font-weight: bold;
      font-size: 1.5rem;
      justify-content: space-between;
    }
    &_color {
      color: ${colors.main};
    }
  }

  .main_schedule-top-weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 1rem;
    }
  }
`;

export const MainScheduleRoute = styled.div`
  display: flex;
  justify-content: space-between;

  .route {
    display: flex;
    justify-content: space-between;
    flex: 1;
    border-right: 1px solid ${colors.grey3};
    padding-right: 32px;
    &_box {
      display: flex;
      flex-direction: column;
      &-label {
        font-weight: bold;
        font-size: 1.2rem;
        color: ${colors.black};
      }
      &-place {
        font-size: 1rem;
        color: ${colors.grey3};
        margin-top: 5px;
      }
    }
  }

  .route_progress_box {
    margin-left: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.main};
    &-percent {
      font-weight: bold;
      font-size: 1.5rem;
    }
    &-km {
      font-size: 0.8rem;
      margin-top: 5px;
    }
  }
`;

export const ProgressBar = styled.div<ProgressProps>`
  width: 100%;
  height: 14px;
  border-radius: 10px;
  background-color: #f3f3f3;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin: 15px 0 11px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .progress {
    height: 8px;
    border-radius: 10px;
    background-color: ${colors.main};
    transition: width 0.2s ease-in-out;
    width: ${(props) => `${props.percentage}%`};
    box-shadow: inset 0px 4px 3px 0px rgba(255, 255, 255, 0.29);
  }
`;
