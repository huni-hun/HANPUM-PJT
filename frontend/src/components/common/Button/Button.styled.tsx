import styled from 'styled-components';

export const ButtonBox = styled.button<{
  width: number;
  height: number;
  bc?: string;
  fc?: string;
  fontSize?: number;
  radius?: number;
  color?: string;
  fontWeight?: string;
}>`
  width: ${(props) => props.width || 12}vw;
  height: ${(props) => props.height || 4}vh;
  background-color: ${(props) => props.bc};
  color: #${(props) => props.fc};
  border-radius: ${(props) => props.radius || 1}rem;
  font-size: ${(props) => props.fontSize || 1}rem;
  border: 2px solid ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
`;
