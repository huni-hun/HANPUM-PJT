import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const DateBadgeContainer = styled.div`
  height: 2.4rem;
  padding: 4px 8px;
  box-sizing: border-box;
  border: 1px solid ${colors.white};
  background-color: ${colors.main};
  border-radius: 10rem;
  font-weight: bold;
  position: absolute;
  z-index: 3;
`;

export const RouteBadgeContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  position: absolute;
  z-index: 3;

  .line {
    width: 0.1rem;
    height: 1rem;
    background-color: ${colors.white};
    margin-left: 3px;
  }
`;

export const InfoBadgeContainer = styled.div`
  position: absolute;
  z-index: 3;
`;
