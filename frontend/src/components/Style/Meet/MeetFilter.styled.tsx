import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const RouteDateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
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

export const ToggleSliderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 83vw;
  margin: auto;
  padding: 3rem 0 0 0;
`;

export const ButtonBox = styled.div`
  width: 90%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
