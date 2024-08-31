import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { colors } from './colorPalette';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Noto';
    src: url('/fonts/NotoSansKR-VariableFont_wght.ttf');
  }


  html, body, #root {
  /* margin: 0 auto; */
    padding: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: #F5F5F5;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Noto', sans-serif;

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

  ol, ul {
    list-style: none;
  }

  :root {
    --white: ${colors.white};
    --black: ${colors.black};
    --black2: ${colors.black2};
    --black3: ${colors.black3};
    --sub: ${colors.sub};
    --main: ${colors.main};
    --line: ${colors.line};
    --red: ${colors.red};
    --grey1 : ${colors.grey1};
    --grey2 : ${colors.grey2};
    --grey3 : ${colors.grey3};
    --grey4 : ${colors.grey4};
    --grey5 : ${colors.grey5};
    --yellow : ${colors.yellow};
  }

`;
