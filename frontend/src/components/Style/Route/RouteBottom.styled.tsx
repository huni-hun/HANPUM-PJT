import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: end;
  position: fixed;
  z-index: 9999;
`;

export const BottomSheetContainer = styled.div`
  width: 100%;
  height: 26.3rem;
  background-color: ${colors.white};
  border-radius: 1.2rem 1.2rem 0 0;
`;
