import styled, { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reset from "styled-reset";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}
  html{
    font-size: 10px;
  }
  *{
    box-sizing: border-box;
  }
  body{
    display: flex;
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
