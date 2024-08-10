import { css } from 'styled-components';
import { colors } from './colorPalette';

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.main};
  `,
};

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.main};
    border: 1px solid ${colors.main};
  `,
};

export const buttonSizeMap = {
  radius: css`
    width: 7.4rem;
    height: 3.3rem;
    border-radius: 100px;
  `,
  small: css`
    width: 9.7rem;
    height: 4.8rem;
    border-radius: 7px;
  `,
  medium: css`
    width: 12.7rem;
    height: 4.8rem;
    border-radius: 7px;
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
