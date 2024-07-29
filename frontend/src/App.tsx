import styled from "styled-components";
import Router from "./pages/Router";
import { GlobalStyle } from "./styles/GlobalStyles";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
