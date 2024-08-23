import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const InterestContainer = styled.div`
  .tab {
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid ${colors.grey4};
    font-size: 1.6rem;
    font-weight: bold;
    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 17rem;
      box-sizing: border-box;
    }

    .active {
      border-bottom: 6px solid ${colors.main};
      color: ${colors.main};
    }
  }
`;
