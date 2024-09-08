import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

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
