import {
  ButtonColor,
  buttonColorMap,
  ButtonSize,
  buttonSizeMap,
  buttonWeakMap,
} from '@/styles/buttons';
import { colors } from '@/styles/colorPalette';
import styled, { css } from 'styled-components';

interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  weak?: boolean;
  full?: boolean;
  disabled?: boolean;
  fontSize?: number;
  fontWeight?: string;
}

/**
 *
 * @param {ButtonColor} [color='primary'] - 버튼의 색상
 * @param {ButtonSize} [size='small'] - 버튼의 크기
 * @param {boolean} [weak=false] - true로 하면 색상 반대로
 * @param {boolean} [full=false] - full크기 여부
 * @param {boolean} [disabled=false] - 활성화 여부
 * @param {number} [fontSize=1.6] - 폰트 크기
 * * @param {string} [fontWeight=bold] - 폰트 굵기
 */

const BaseButton = styled.button<ButtonProps>(
  // 기본 스타일
  {
    cursor: 'pointer',
    color: 'white',
    outline: 'none',
  },
  ({ fontSize = '1.6' }) => css`
    font-size: ${fontSize}rem;
  `,
  ({ fontWeight = 'bold' }) => css`
    font-size: ${fontWeight};
  `,
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          background-color: ${colors.grey1};
          cursor: default;
        `
      : undefined,
);

export default BaseButton;
