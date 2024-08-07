import styled from 'styled-components';
import { colors } from '@styles/colorPalette';

export const HeaderWrapper = styled.div`
  height: 9.8rem;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
  padding: 0 2rem;
  background-color: ${colors.white};
`;
