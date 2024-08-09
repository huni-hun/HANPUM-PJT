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
    background-color: #F5F5F5;
  }

  :root {
    --white: ${colors.white};
    --black: ${colors.black};
    --sub_grey: ${colors.sub_grey};
    --green: ${colors.green};
    --line: ${colors.line};
    --red: ${colors.red};
    --grey1 : ${colors.grey1};
    --grey2 : ${colors.grey2};
    --grey3 : ${colors.grey3};
    --grey4 : ${colors.grey4};
  }
`;
