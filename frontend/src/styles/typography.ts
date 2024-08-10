import { css } from 'styled-components';

export const typographyMap = {
  t20: css`
    font-size: 2rem;
  `,
  t16: css`
    font-size: 1.6rem;
  `,
  t15: css`
    font-size: 1.5rem;
  `,
  t14: css`
    font-size: 1.4rem;
  `,
  t13: css`
    font-size: 1.3rem;
  `,
  t12: css`
    font-size: 1.2rem;
  `,
  t10: css`
    font-size: 1rem;
  `,
  t8: css`
    font-size: 0.8rem;
  `,
  t6: css`
    font-size: 0.6rem;
  `,
};

export type Typography = keyof typeof typographyMap;
