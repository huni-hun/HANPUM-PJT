import { colors } from '@/styles/colorPalette';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
`;

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.6rem 0 0 0;
`;

export const SliderBox = styled.div`
  width: 85%;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 3.7rem;
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

export const TypeContainer = styled.div`
  width: 85%;
  height: 21rem;
`;

export const Type = styled.div<{ $isSelect: boolean }>`
  width: 7.5rem;
  height: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.$isSelect ? colors.main : colors.grey2)};
  border: 0.1rem solid
    ${(props) => (props.$isSelect ? colors.main : colors.grey2)};
  border-radius: 10rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TypeBox = styled.div`
  width: 100%;
  height: 19rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 12vh;
  background-color: ${colors.white};
  box-shadow: 0.1rem -0.1rem 0.1rem #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: end;
`;
