import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export interface SchduleCardProps {
  backGroundImg?: string;
}

export const CardContainder = styled.div`
  width: 90vw;
  height: 60vw;
  margin-bottom: 0.5rem;
  margin: auto;
  box-sizing: border-box;
`;

export const CardWarp = styled.div<SchduleCardProps>`
  background-image: url(${(props) => props.backGroundImg});
  background-size: 98vw;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  box-sizing: border-box;
  color: ${colors.white};
  padding: 1.5rem 2rem;
  /** 정렬 */
  display: flex;
  flex-direction: column;
`;

export const CardDateWrap = styled.div`
  display: flex;
  width: 100%;
  height: 10vw;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
`;

export const CardDDay = styled.div`
  width: 13vw;
  height: 7vw;
  background-color: #1c1c1e;
  border-radius: 1rem;

  font-weight: 500;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardScheduleDate = styled.div`
  font-size: 1.3rem;
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 10vw;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-top: 6rem;

  span {
    font-size: 2.4rem;
    font-weight: 700;
  }

  p {
    font-size: 1.4rem;
  }
`;

export const CardDdayBadge = styled.div`
  background-color: ${colors.main};
  border: 0.2rem ${colors.white} solid;
  border-radius: 2rem;
  width: 14vw;
  height: 7vw;

  font-size: 1.4rem;
  font-weight: 700;

  margin-top: 5rem;
  margin-left: 27rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
