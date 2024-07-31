import styled from 'styled-components';

export const SelectBox = styled.div<{
  width: number;
  height: number;
  radius: number;
  border: string;
  fontSize: number;
  fontColor: string;
  padding: number;
}>`
  width: ${(props) => props.width}vw;
  height: ${(props) => props.height}vh;
  border: ${(props) => props.border};
  border-radius: ${(props) => props.radius}rem;
  color: #${(props) => props.fontColor || '#ffffff'};
  font-size: ${(props) => props.fontSize || 1}rem;
  display: flex;
  align-items: center;
  position: relative;
  padding: ${(props) => props.padding}rem;
`;

export const SelectList = styled.ul<{
  isOpen: boolean;
  radius: number;
  border: string;
  height: number;
}>`
  width: 100%;
  max-height: ${(props) => (props.isOpen ? 'none' : '0')};
  overflow: hidden;
  border: ${(props) => (props.isOpen ? props.border : '')};
  border-radius: ${(props) => props.radius}rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.height + 1}vh;
  left: 0;
`;

export const SelectLabel = styled.label<{
  fontSize: number;
  fontColor: string;
}>`
  color: #${(props) => props.fontColor || '#ffffff'};
  font-size: ${(props) => props.fontSize || 1}rem;
`;

export const SelectItem = styled.li`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0 0 0 0.5rem;
`;
