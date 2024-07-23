import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html{
    font-size:62.5%
  }

  body{
    height: 100vh;
  }

  
`;
