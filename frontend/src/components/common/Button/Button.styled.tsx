import styled from 'styled-components';

export const ButtonBox = styled.button<{
  width: number;
  height: number;
  backgroundColor?: string;
  fontColor?: string;
  fontSize?: number;
  radius?: number;
  color?: string;
  fontWeight?: string;
}>`
  width: ${(props) => props.width || 12}vw;
  height: ${(props) => props.height || 4}vh;
  background-color: ${(props) => props.backgroundColor};
  color: #${(props) => props.fontColor};
  border-radius: ${(props) => props.radius || 1}rem;
  font-size: ${(props) => props.fontSize || 1}rem;
  border: 2px solid ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`;
