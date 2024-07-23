import styled, { createGlobalStyle } from "styled-components";
import Router from "./pages/Router";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Router />
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
