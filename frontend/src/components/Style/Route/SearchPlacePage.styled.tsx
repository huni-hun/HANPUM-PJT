import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-dircetion: row;
`;

export const HeaderButton = styled.div`
  width: 9vw;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled.div`
  width: 91vw;
  height: 7vh;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 90%;
  height: 4.5vh;
  border: 0.1rem solid ${colors.grey1};
  background-color: transparent;
  border-radius: 10rem;
  font-size: 1.4rem;
  padding: 0 0 0 2rem;
  outline: none;
  font-color: ${colors.grey1};
`;

export const MainContainer = styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0 0 0;
`;

export const PlaceBox = styled.div`
  width: 100%;
  height: 1.9rem;
  display: flex;
  margin-bottom: 1.6rem;
`;

export const PlaceText = styled.p`
  font-size: 1.4rem;
  margin-left: 6rem;
`;
