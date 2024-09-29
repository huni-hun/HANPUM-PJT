import { css } from 'styled-components';
import { colors } from './colorPalette';

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.main};
  `,
  cancel: css`
    background-color: ${colors.grey2};
  `,
};

export const buttonWeakMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.main};
    border: 1px solid ${colors.main};
  `,
  cancel: css`
    background-color: ${colors.white};
    color: ${colors.grey2};
    border: 1px solid ${colors.grey2};
  `,
};

export const buttonSizeMap = {
  radius: css`
    width: 7.4rem;
    height: 3.3rem;
    border-radius: 100px;
  `,
  longRadius: css`
    width: 10.1rem;
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

  large: css`
    width: 26.9rem;
    height: 4.8rem;
    border-radius: 7px;
  `,

  apply: css`
    width: 25.4rem;
    height: 5rem;
    border-radius: 7px;
  `,
  banner: css`
    width: 27rem;
    height: 5.8rem;
    border-radius: 15px;
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
