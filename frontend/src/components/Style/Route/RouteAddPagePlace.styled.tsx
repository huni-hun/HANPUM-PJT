import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
`;

export const PlaceContainer = styled.div`
  width: 90vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;

export const PlaceContent = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-dircetion: row;
  justify-content: space-between;
`;

export const PlaceImg = styled.img<{ src: string }>`
  width: 45%;
  height: 90%;
  border-radius: 1.2rem;
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
  justify-content: end;
  align-items: end;
`;
