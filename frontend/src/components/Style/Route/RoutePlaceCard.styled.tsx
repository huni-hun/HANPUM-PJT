import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

interface ScheduleProps {
  scheduleState?: boolean;
  turnGreen?: boolean;
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
  background-color: ${(props) =>
    props.scheduleState || props.turnGreen ? colors.main : colors.grey2};
  color: ${(props) =>
    props.scheduleState || props.turnGreen ? colors.white : '#000'};
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
