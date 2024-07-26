import styled from "styled-components";
import { GlobalStyle } from "./global/GlobalStyle";
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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
