import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const SliderBox = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SliderTextBox = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SliderText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

export const ContentText = styled.p`
  font-size: 1.2rem;
  color: ${colors.main};
`;
