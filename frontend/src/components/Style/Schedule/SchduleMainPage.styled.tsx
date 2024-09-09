import styled from 'styled-components';
import { colors } from '@/styles/colorPalette';

interface ProgressProps {
  percentage: number;
}

export const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  .grayBox {
    height: 35.8rem;
    background-color: ${colors.grey1};
  }
`;

export const Main = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow-y: auto;

  padding-bottom: 8vh;
`;

export const Overflow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  margin-top: 13vw;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const RouteInfoContainer = styled.div`
  width: 100vw;
  /* height: 80vh; */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  height: 10vh;
  display: flex;
  align-items: end;
`;

export const HeaderContent = styled.div`
  height: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem 2rem 2rem;
`;

export const HeaderTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const HeaderIcon = styled.img<{ src: string }>`
  src: ${(props) => props.src};
`;

export const SchduleTypeContainer = styled.div`
  height: 6vh;
  display: flex;
  /* border-bottom: 0.2rem solid #fff; */
  background-color: #fff;
  position: fixed;
  width: 100%;
  z-index: 999;
`;

export const SchduleTypeBox = styled.div`
  width: 65vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ScheduleType = styled.p<{ isSelected: boolean }>`
  font-size: 1.5rem;
  color: ${(props) => (props.isSelected ? colors.main : colors.grey1)};
  font-weight: bold;
  cursor: pointer;
`;

export const ScheduleMainContainer = styled.div`
  width: 100vw;
  height: 75vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

export const ScheduleWeatherContainer = styled.div`
  width: 100vw;
  /* height: 75vh; */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 2rem;
`;

export const SchduleProgressWrap = styled.div`
  width: 85vw;
  /* height: 22vh; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* padding-top: 2rem; */
`;

export const PercentBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-left: 0.1rem solid ${colors.grey1};
  padding: 0 0 0 0.5rem;
`;

export const PercentText = styled.p`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${colors.main};
`;

export const CalculateDistance = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #c9c9c9;
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
    box-shadow: inset 0px 4px 3px 0px rgba(229, 198, 198, 0.29);
  }
`;

export const ProgressBox = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProgressText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #c9c9c9;
  .green_text {
    color: ${colors.main};
  }
  .bold-text {
    /* font-size: 1.5rem; */
    color: #787878;
  }
`;

/** weather */
export const WeatherContainer = styled.div`
  width: 85vw;
  padding-top: 2rem;
`;

export const WeatherWrap = styled.div`
  background-color: #7787ab;
  border-radius: 1.5rem;
  /* width: 100%; */
  height: 18vh;
  display: flex;
  flex-direction: column;
  padding: 1.7rem;

  p {
  }

  .weather_location {
    color: #fff;
    border-bottom: 0.1rem solid #fff;
    text-align: right;
    padding-bottom: 0.5rem;
    width: 99%;
    font-size: 1.3rem;
  }
`;

export const WeatherContentWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 80%;
  justify-content: space-between;
  flex-shrink: 0;
  margin-top: 1rem;
`;

export const WeatherContent = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 0.3rem;
  box-sizing: border-box;
  margin-right: 2rem;
  width: 7rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;

  p {
    width: 100%;
  }
  img {
    width: 100%;
    height: 7vh;
  }
`;

export const EmergenyNotice = styled.div`
  width: 100%;
  height: 8vh;
  background-color: #fbdcdc;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 2rem;
  .weather_img {
    width: 10vw;
    height: 7vw;
    margin-left: 2rem;
  }
  p {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

/** 모임 멤버 */
export const MemberTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  .sub_title {
    font-size: 1.2rem;
    color: #707070;
  }
`;

export const MembersWrap = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Members = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sub_title {
    font-size: 1.2rem;
    color: ${colors.grey1};
  }
  .member_img {
    width: 20vw;
    height: 19vw;
    margin-bottom: 1rem;
    border: 1px solid #787878;
    border-radius: 50%;
  }
`;

export const Hr = styled.div`
  height: 0.1rem;
  background-color: #d9d9d9;
  margin-bottom: 2.5rem;
`;

export const NoData = styled.div`
  /* height: 30vh; */
  padding: 2rem 1rem;
  font-size: 1.5rem;
`;

export const Precipitation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 2vh;
  .precipitation {
    width: 5vw;
  }
  img {
    width: 3vw;
  }
`;

/** 관광지 */

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
  box-shadow: 0.2rem 0.2rem 0.3rem ${colors.grey1};
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
export const AttractionsContainer = styled.div`
  width: 100%;

  background-color: #fff;
`;
export const AttractionsBox = styled.div`
  width: 90%;
  min-height: 28vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 0 auto;
  padding-top: 4rem;
  padding-bottom: 2rem;
  gap: 1.5rem;
`;

export const AttrantiosTypeBox = styled.div`
  width: 100%;
  /* height: 0vh; */
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  font-weight: bold;
  /* margin-bottom: 1.6rem; */
`;

export const AttractionsOverflow = styled.div`
  display: flex;
  flex-direction: row;
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
  gap: 2rem;
  flex-shrink: 0;
  margin-right: 0.4rem;
  border-radius: 1.2rem;
  background-image: url(${(props) => props.img});
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

export const MeetMemeberContainer = styled.div`
  width: 95%;
  height: 75vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

export const MeetMemberNodata = styled.div`
  height: 75vh;
  padding: 1rem;
`;

export const SchduleCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100vw;
  height: 100%;
  margin-top: 13vw;
  /* padding-bottom: 8vh; */
`;
