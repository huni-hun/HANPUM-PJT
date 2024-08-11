import { CSSProperties } from 'react';

import { colors, Colors } from '@styles/colorPalette';
import { Typography, typographyMap } from '@styles/typography';
import styled from 'styled-components';

interface TextProps {
  typography?: Typography;
  color?: Colors;
  display?: CSSProperties['display'];
  textAlign?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  bold?: boolean;
}

/**
 * @param {Typography} [typography='t10'] 텍스트의 타이포그래피 스타일
 * @param {Colors} [color='black'] 텍스트의 색상
 * @param {CSSProperties['display']} [display]  display 속성
 * @param {CSSProperties['textAlign']} [textAlign] 텍스트의 정렬
 * @param {CSSProperties['fontWeight']} [fontWeight] 텍스트의 굵기
 * @param {boolean} [bold] 텍스트를 굵게 표시할지 `fontWeight`보다 우선 적용됩니다.
 */
const Text = styled.span.attrs<TextProps>(() => ({
  bold: undefined,
}))(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typography = 't10' }) => typographyMap[typography],
);

export default Text;
