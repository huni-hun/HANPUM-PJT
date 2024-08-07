import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px 23px;
  margin-top: 22px;

  .more {
    width: 100%;
    height: 4.8rem;
    border-radius: 7px;
    color: ${colors.white};
    font-weight: bold;
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #a0a0a0;
  }
`;
