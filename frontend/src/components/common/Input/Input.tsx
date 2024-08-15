import styled from 'styled-components';

import { colors } from '@styles/colorPalette';

const Input = styled.input`
  padding: 14px 12px;
  font-size: 1.4rem;
  height: 4.8rem;
  font-weight: 500;
  border: 1px solid ${colors.grey2};
  border-radius: 7px;
  width: 100%;
  box-sizing: border-box;
  flex: 1;

  ::placeholder {
    color: ${colors.grey2};
  }

  &:focus {
    outline: none;
    border-color: ${colors.main};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`;

export default Input;
