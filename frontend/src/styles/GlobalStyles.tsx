import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { colors } from './colorPalette';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }

  body {
    height: 100vh;
  }

  :root {
    --white: ${colors.white};
    --black: ${colors.black};
    --sub_grey: ${colors.sub_grey};
    --green: ${colors.green};
    --grey: ${colors.grey};
  }
`;
