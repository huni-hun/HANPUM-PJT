import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 28.7rem;
    height: 26.326;
    margin-bottom: 28.7px;
  }

  span {
    line-height: 27px;
  }

  p {
    /* margin-top: 4px; */
    font-size: 2rem;
    font-weight: bold;
    span {
      color: ${colors.main};
    }
  }
`;
