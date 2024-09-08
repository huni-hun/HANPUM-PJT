import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

interface StyledProps {
  backgroundImg?: string;
}

interface MeetStyleProps {
  isMeetFeed?: string;
}

export const Badge = styled.div`
  background-color: ${colors.black}90;
  color: ${colors.white};
  width: 50vw;
  height: 10vw;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
`;

export const MeetInfoWrap = styled.div`
  height: 20vw;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid ${colors.grey1};
  border-radius: 1rem;
  margin: 2rem 0 1rem 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

export const MeetInfoText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3rem;
  gap: 0.3rem;
  p {
    font-size: 1.5rem;
    font-weight: bold;
  }

  span {
    color: #777;
    font-size: 1.2rem;
  }
`;

export const Hr = styled.div`
  width: 0.1rem;
  height: 9vw;
  background-color: #ccc;
`;

/* 모임 태그 */
export const MeetInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 55vh;
  padding-bottom: 1rem;
`;

/** 효령 - Feed.tsx */

export const TagsWrap = styled.div`
  display: flex;
  justify-content: left;
  gap: 1rem;
  /* width: 60%; */
  align-items: center;
  height: 2.8rem;
  /* border: 1px solid red; */
`;

export const Tags = styled.div`
  border: ${colors.main} 1px solid;
  color: ${colors.main};
  font-weight: 600;
  padding: 0.1rem 1rem;
  height: 100%;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/** feed */
export const RouteNameInfo = styled.div<MeetStyleProps>`
  width: 85vw;
  height: ${(props) => props.isMeetFeed || '20.2rem'};
  display: flex;
  flex-direction: column;
  /* border-bottom: 0.1rem solid #d9d9d9; */
  padding: 1.4rem 0 1rem 0;
  position: relative;
`;

export const RouteNameInfoContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
`;

export const RouteDateBox = styled.div<MeetStyleProps>`
  width: 85vw;
  height: ${(props) => props.isMeetFeed || '20.2rem'};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  padding-bottom: 2rem;
`;

export const RouteTypeContainer = styled.div`
  width: 100%;
  height: 27%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
`;

export const RouteType = styled.div<{ isLong: boolean }>`
  width: ${(props) => (props ? '7.5rem' : '6.4rem')};
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  border: 0.1rem solid ${colors.main};
  color: ${colors.main};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.8rem;
  flex-shrink: 1;
`;

export const RouteName = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

export const RouteInfo = styled.p`
  color: #c9c9c9;
  font-size: 1.4rem;
`;
