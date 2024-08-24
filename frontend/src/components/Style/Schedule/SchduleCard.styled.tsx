import styled from 'styled-components';

export interface SchduleCardProps {
  backGroundImg?: string;
}

export const CardContainder = styled.div`
  width: 85vw;
  height: 40vw;
`;

export const CardWarp = styled.div<SchduleCardProps>`
  background-image: url(${(props) => props.backGroundImg});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
