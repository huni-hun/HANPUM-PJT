import styled from 'styled-components';
import { colors } from '@/styles/colorPalette';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

export const OverFlow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100vw;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 1.6rem 0 1.6rem;
`;

export const DayContainer = styled.div`
  width: 91vw;
  height: 7vh;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const DayOverFlow = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  align-items: center;
`;

export const DayCard = styled.div<{ isSelected: boolean }>`
  width: 7.4rem;
  height: 3.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.8rem;
  align-items: center;
  border: 0.15rem solid
    ${(prop) => (prop.isSelected ? colors.main : colors.grey2)};
  border-radius: 10rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(prop) => (prop.isSelected ? colors.main : colors.grey2)};
  flex-shrink: 0;
`;

export const DatAddCard = styled.div`
  width: 7.4rem;
  height: 3.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0.15rem solid ${colors.grey2};
  border-radius: 10rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${colors.grey2};
  flex-shrink: 0;
`;

export const MapCard = styled.div`
  width: 84vw;
  height: 68vh;
  border-radius: 1.2rem;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.6rem 1.6rem 1.6rem;
  box-shadow: 0 0.2rem 0.7rem ${colors.grey1};
  overflow-y: auto;
`;

export const MapCardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const MapSearchBox = styled.div`
  width: 79vw;
  height: 5rem;
  border: 0.1rem solid ${colors.grey1};
  border-radius: 10rem;
  margin-top: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 2.1rem;
`;

export const SearchText = styled.p`
  font-size: 1.2rem;
  color: ${colors.grey2};
  margin-left: 1.1rem;
`;

export const MapBox = styled.div`
  width: 83vw;
  height: 38vh;
  margin-top: 1.2rem;
`;

export const PlaceContainer = styled.div`
  width: 83vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const PlaceBox = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const PlaceTypeBox = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
`;

export const BottomContainer = styled.div`
  width: 100vw;
  height: 13vh;
  background-color: #ffffff;
  border-radius 0.8rem 0.8rem 0 0;  
  box-shadow: 0.1rem -0.1rem 0.1rem #D9D9D9;
  display:flex;
  justify-content: center;
  align-items:center;
  z-index:55;
`;

export const ButtonBox = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: end;
`;
