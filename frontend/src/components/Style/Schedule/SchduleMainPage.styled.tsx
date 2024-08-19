import styled from 'styled-components';
import { colors } from '@/styles/colorPalette';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  .grayBox {
    height: 35.8rem;
    background-color: ${colors.grey1};
  }
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
  border-bottom: 0.2rem solid #f2f2f2;
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
  border-bottom: 0.2rem solid #f2f2f2;
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
  height: 69vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 6rem 0 0 0; */
`;
