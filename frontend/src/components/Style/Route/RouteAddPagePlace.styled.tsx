import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
`;

export const Header = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderButton = styled.div`
  width: 9vw;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const MapContainer = styled.div`
  width: 100vw;
  height: 82vh;
  background-color: #1155ac;
`;

export const PlaceBottomContainer = styled.div`
  width: 100vw;
  height: 28vh;
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;
  justify-content: center;
  z-index: 30;
  box-shadow: 2px -2px 0 0 rgba(0, 0, 0, 0.25);
  flex-direction: column;
  align-items: center;
`;

export const PlaceContainer = styled.div`
  width: 90%;
  height: 85%;
  display: flex;
  flex-direction: column;
`;

export const PlaceContent = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-dircetion: row;
  border-bottom: 0.1rem solid ${colors.grey1};
`;

export const CircleContainer = styled.div`
  height: 100%;
  width: 1.5rem;
  display: flex;
  margin-right: 0.4rem;
`;

export const CircleBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
`;

export const CircleBorder = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 0.2rem solid ${colors.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div`
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  background-color: ${colors.main};
`;

export const PlaceTextBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PlaceNameBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
`;

export const PlaceName = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PlaceType = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-left: 1rem;
`;

export const PlaceAddressBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
`;

export const PlaceAddress = styled.p`
  font-size: 1.2rem;
`;

export const AddBtnContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
