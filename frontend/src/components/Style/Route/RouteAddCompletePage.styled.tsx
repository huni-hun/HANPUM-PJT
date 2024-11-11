import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
    width:100%;
    height:100%;
    display:flex
    flex-direction:column;
    background-color:${colors.white};
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TextBox = styled.div`
  width: auto;
  height: 5.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const BtnContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
