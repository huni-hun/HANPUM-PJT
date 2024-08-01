import { CSSProperties } from 'react';
import styled from 'styled-components';

interface FlexProps {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  direction?: CSSProperties['flexDirection'];
  gap?: CSSProperties['gap'];
  wrap?: CSSProperties['flexWrap'];
}

const Flex = styled.div<FlexProps>(
  ({ align, justify, direction, gap, wrap }) => ({
    display: 'flex',
    alignItems: align,
    justifyContent: justify,
    flexDirection: direction,
    gap: gap,
    wrap: wrap,
  }),
);

export default Flex;
