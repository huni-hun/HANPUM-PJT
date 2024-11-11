import styled from 'styled-components';

interface SpacingProps {
  size: number;
  direction?: 'vertical' | 'horizontal';
}

const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = 'vertical' }) =>
    direction === 'vertical'
      ? `
  height:${size}rem;
  `
      : `
  width:${size}rem;
  `}
`;

export default Spacing;
