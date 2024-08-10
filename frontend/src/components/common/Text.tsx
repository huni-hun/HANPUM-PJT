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

const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typography = 't10' }) => typographyMap[typography],
);

export default Text;
