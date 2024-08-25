import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const BottomTab = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 0.2rem solid #e5e5e5;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 11;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: ${colors.white};
  width: 100%;
`;

export const BottomTabItem = styled.div`
  flex: 1;
  height: 8vh;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const TabText = styled.p<{ isSelected: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => (props.isSelected ? colors.main : colors.grey1)};
`;
