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
  height: auto;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

export const OverFlow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 1.6rem 0 1.6rem;
  padding-bottom: 15vh;
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

export const DayCard = styled.div<{ selected: boolean }>`
  width: 7.4rem;
  height: 3.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.8rem;
  align-items: center;
  border: 0.15rem solid
    ${(prop) => (prop.selected ? colors.main : colors.grey2)};
  border-radius: 10rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(prop) => (prop.selected ? colors.main : colors.grey2)};
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
  min-height: 70vh;
  border-radius: 1.2rem;
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 1.6rem 1.6rem 1.6rem 1.6rem;
  overflow-y: auto;
  z-index: 10;
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
  flex-shrink: 0;
`;

export const PlaceContainer = styled.div`
  width: 83vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const PlaceBox = styled.div`
  width: 100%;
  max-height: 35vh;
  min-height: 10vh;
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
  border-radius: 0.8rem 0.8rem 0 0;
  box-shadow: 0.1rem -0.1rem 0.1rem #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 55;
  position: fixed;
  bottom: 0;
`;

export const ButtonBox = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: end;
`;

export const DetailWayOverflow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AttractionsBox = styled.div`
  width: 100%;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const AttrantiosTypeBox = styled.div`
  width: 100%;
  height: 4vh;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
`;

export const AttractionsOverflow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-x: auto;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AttractionCard = styled.div<{ img: string }>`
  width: 8.4rem;
  height: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  background-color: ${colors.grey1};
  flex-shrink: 0;
  margin-right: 0.4rem;
  border-radius: 1.2rem;
  background-image: url(${(props) => props.img});
  background-size: cover;
`;

export const AttractionAddCard = styled.div`
  width: 8.4rem;
  height: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.8rem 0.5rem 0.8rem;
  background-color: ${colors.grey1};
  flex-shrink: 0;
  margin-right: 0.4rem;
  border-radius: 1.2rem;
  font-size: 3rem;
  font-weight: bold;
`;

export const AttractionCardTitle = styled.p`
  font-size: 1rem;
  color: ${colors.white};
`;

export const AttractionCardDetail = styled.div`
  width: 8.2rem;
  height: 2.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.white};
`;

export const AttractionCardDetailText = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  white-space: nowrap; /* 텍스트가 줄바꿈 없이 한 줄로 유지되도록 설정 */
  overflow: hidden; /* 부모 요소를 넘는 부분을 숨김 */
  text-overflow: clip;
  font-size: 1.2rem;
  font-weight: bold;
`;
