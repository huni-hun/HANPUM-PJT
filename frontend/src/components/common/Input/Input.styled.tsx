import styled from 'styled-components';

interface InputProps {
  width?: string | number;
  size?: 'md' | 'sm';
}

export const InputWrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border: none;
  border-radius: 8px;
  padding: 0 10px;
`;

export const Input = styled.input<InputProps>`
  max-width: ${(props) => `${props.width}px`};
  width: 100%;
  height: ${(props) => (props.size === 'md' ? `50px` : `38px`)};
  box-sizing: border-box;
  outline: none;
  border: none;
  font-weight: 500;

  &::placeholder {
    color: #000;
  }
`;
