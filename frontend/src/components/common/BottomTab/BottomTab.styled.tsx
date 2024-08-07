import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const BottomTab = styled.div`
  /* width: 100vw; */
  /* height: 8vh; */
  display: flex;
  flex-direction: row;
  border-top: 0.2rem solid #e5e5e5;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 11;
`;

export const BottomTabItem = styled.div`
  flex: 1;
  height: 6vh;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
