import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const RouteDateBox = styled.div`
  width: 85vw;
  height: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  padding-bottom: 1rem;
  margin: auto;
  box-sizing: border-box;
`;

export const StartDateBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EndDateBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DateText = styled.p`
  font-size: 1.2rem;
  color: #c9c9c9;
`;

export const RouteDateTilteBox = styled.div`
  width: 100%;
  height: 20%;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: end;
`;

export const RouteDateInfoBox = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const RoutePlaceInfoBox = styled.div`
  width: 42%;
  height: 6.4rem;
  background-color: ${colors.grey5};
  display: flex;
  padding: 0 0 0 2rem;
  border-radius: 1.2rem;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const PointText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.grey1};
  margin-bottom: 0.8rem;
`;

export const PlaceText = styled.p`
  font-size: 1.4rem;
  color: #424242;
  .bold-text {
    /* font-size: 1.5rem; */
    color: #424242;
  }
`;

export const RouteDateTextBox = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: end;
  align-items: start;
  font-size: 1.2rem;
  color: ${colors.grey2};
`;

export const DateBoldText = styled.p`
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const RouteIconBox = styled.div`
  width: 6rem;
  height: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const FilterBox = styled.div`
  width: 85vw;
  height: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  /* padding-bottom: 2rem; */
  margin: auto;
  box-sizing: border-box;
`;

export const ToggleSliderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 94vw;
  margin: auto;
  padding: 3rem 0 0 0;
`;
export const ArrowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: ${colors.white};
`;
