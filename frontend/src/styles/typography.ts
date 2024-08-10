import { css } from 'styled-components';

export const typographyMap = {
  t20: css`
    font-size: 2rem;
    font-weight: bold;
  `,
  tlabel: css`
    font-size: 1.2rem;
    font-weight: bold;
  `,
  t3: css`
    font-size: 22px;
  `,
  t4: css`
    font-size: 20px;
  `,
  t5: css`
    font-size: 17px;
  `,
  t6: css`
    font-size: 15px;
  `,
  t7: css`
    font-size: 13px;
  `,
};

export type Typography = keyof typeof typographyMap;
