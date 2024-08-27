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
  width: 85%;
  height: 30vw;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid ${colors.grey1};
  border-radius: 1rem;
  margin: 2rem 0 2rem 0;
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
    font-size: 1.8rem;
    font-weight: bold;
  }

  span {
    color: #777;
    font-size: 1.4rem;
  }
`;

export const Hr = styled.div`
  width: 0.1rem;
  height: 9vw;
  background-color: #ccc;
`;
