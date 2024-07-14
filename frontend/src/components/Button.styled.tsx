import styled from "styled-components";

export const ButtonBox = styled.button<{
  width: number;
  height: number;
  backgroundColor: string;
  fontColor: string;
  fontSize: number;
  radius: number;
}>`
  width: ${(props) => props.width || 12}vw;
  height: ${(props) => props.height || 4}vh;
  background-color: ${(props) => props.backgroundColor || "#ff00ff"};
  color: #${(props) => props.fontColor || "#ffffff"};
  border-radius: ${(props) => props.radius || 1}rem;
  font-size: ${(props) => props.fontSize || 1}rem;
`;
