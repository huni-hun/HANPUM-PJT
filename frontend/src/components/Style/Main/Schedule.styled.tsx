import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

interface ProgressProps {
  percentage: number;
}

export const Container = styled.div`
  padding: 20px 24px 20px;
  background-color: ${colors.white};

  .location-container {
    display: flex;
    align-items: center;
    gap: 31px;
    .location-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
  }

  .attainment-container {
    display: flex;
    flex-direction: column;
    border-top: 1px solid;
    padding-top: 12px;
    margin-top: 8px;
  }
`;

export const ProgressBar = styled.div<ProgressProps>`
  width: 31.1rem;
  height: 14px;
  border-radius: 10px;
  background-color: #f3f3f3;
  box-shadow: inset 0px 2px 7px 0px rgba(0, 0, 0, 0.25);
  margin: 20px auto 0;
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
