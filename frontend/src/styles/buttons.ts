import { css } from 'styled-components';
import { colors } from './colorPalette';

export const buttonColorMap = {
  primary: css`
    background-color: ${colors.green};
  `,
};

export const buttonSizeMap = {
  small: css`
    width: 7.4rem;
    height: 3.3rem;
  `,
  medium: css`
    width: 14.4rem;
    height: 4.8rem;
  `,
};

export type ButtonColor = keyof typeof buttonColorMap;
export type ButtonSize = keyof typeof buttonSizeMap;
