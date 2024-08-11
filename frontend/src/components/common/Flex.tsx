import { CSSProperties } from 'react';
import styled from 'styled-components';

interface FlexProps {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  wrap?: CSSProperties['flexWrap'];
}

/**
 * @param {CSSProperties['align']} [align]  flex-align 속성
 * @param {CSSProperties['justify']} [justify] justify content 속성
 * @param {CSSProperties['direction']} [direction] flex-direction 속성
 * @param {CSSProperties['gap']} [gap] gap 속성
 * @param {CSSProperties['wrap']} [wrap] wrap 속성
 */
const Flex = styled.div<FlexProps>(
  ({ align, justify, direction, gap, wrap }) => ({
    display: 'flex',
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    gap: gap,
    wrap: wrap,
    width: '100%',
  }),
);

export default Flex;
