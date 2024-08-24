import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const CardLongContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16rem;
  border-radius: 20px;
  box-sizing: border-box;
  .info-box {
    position: absolute;
    left: 16px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 3;

    .review {
      display: flex;
      gap: 3px;
      align-items: center;
    }

    .info-root {
      display: flex;
      gap: 4px;
      align-items: center;

      .line {
        width: 0.1rem;
        height: 1rem;
        background-color: ${colors.white};
        margin-left: 3px;
      }
    }
  }
`;
