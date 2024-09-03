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
  margin-top: 12vw;

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
  border: 0.2rem solid red;
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
  /* height: 75vh; */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  margin-top: 2rem;
  padding-bottom: 2rem;
`;

export const SchduleProgressWrap = styled.div`
  width: 85vw;
  height: 19vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 2rem;
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
  width: 100%;
  height: 22vh;
  display: flex;
  flex-direction: column;
  padding: 1.7rem;
  box-sizing: border-box;

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
`;

export const WeatherContent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  box-sizing: border-box;

  p {
  }
`;

export const EmergenyNotice = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fbdcdc;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-top: 2rem;
  .weather_img {
    width: 10vw;
    height: 10vw;
    margin-left: 2rem;
  }
  p {
    font-size: 1.5rem;
    margin-left: 1.5rem;
    margin-top: 0.5rem;
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
