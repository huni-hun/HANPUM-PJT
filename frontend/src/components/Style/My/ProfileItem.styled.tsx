import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const ProfileItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .info {
    /* flex: 1; */
    width: 25rem;
    height: 5.4rem;
    border-bottom: 1px solid ${colors.grey4};
    display: flex;
    align-items: center;
    padding-left: 1.2rem;
    box-sizing: border-box;
  }
`;
