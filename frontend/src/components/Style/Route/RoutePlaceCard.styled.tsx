import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

interface ScheduleProps {
  $isSchedule?: boolean;
  state?: number;
  $turnGreen?: boolean;
}

export const Card = styled.div`
  width: 80%;
  height: 7.5rem;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: start;
  border-left: 0.15rem solid ${colors.grey1};
  position: relative;
  flex-shrink: 0;
`;

export const PlaceInfoBox = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  border-bottom: 0.15rem solid ${colors.grey1};
  justify-content: space-around;
`;

export const PlaceName = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PlaceAddressBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;

export const PlaceNumberBox = styled.div<ScheduleProps>`
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: -0.85rem;
  background-color: ${(props) => {
    if (props.$isSchedule) {
      // 일정 페이지일 때, state가 2이거나 turnGreen이 true일 때만 main 색상
      if (props.state === 2 || props.$turnGreen) {
        return colors.main; // green
      } else {
        return colors.grey2; // grey
      }
    }
    // 일정 페이지가 아닐 때는 항상 main 색상
    return colors.main;
  }};
  color: ${(props) => {
    if (props.$isSchedule) {
      if (props.state === 2 || props.$turnGreen) {
        return colors.white; // state가 2이거나 turnGreen이 true일 때 white
      } else {
        return colors.black; // 나머지 경우 black
      }
    } else {
      return colors.white; // !일정 페이지일 때 white
    }
  }};
`;

export const RetouchCardContainer = styled.div`
  width: 100%;
  height: 7.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.15rem solid ${colors.grey1};
  flex-shrink: 0;
`;

export const RetouchCard = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: start;
  border-left: 0.15rem solid ${colors.grey1};
  position: relative;
  flex-shrink: 0;
`;

export const RetouchPlaceInfoBox = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const RetouchIconBox = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
