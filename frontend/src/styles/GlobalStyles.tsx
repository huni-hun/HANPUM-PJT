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

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
  }

  :root {
    --white: ${colors.white};
    --black: ${colors.black};
    --sub: ${colors.sub};
    --main: ${colors.main};
    --line: ${colors.line};
    --red: ${colors.red};
    --grey1 : ${colors.grey1};
    --grey2 : ${colors.grey2};
    --grey3 : ${colors.grey3};
    --grey4 : ${colors.grey4};
  }
`;
