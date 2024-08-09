import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const MeetScheduleContainer = styled.div`
  /* padding-left: 1.6rem; */

  .list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: ${colors.white};
    padding: 12px 16px 0 16px;
    box-sizing: border-box;
  }
`;
