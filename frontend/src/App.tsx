import styled from 'styled-components';
import Router from '@pages/Router';

function App() {
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  padding-bottom: 6vh;
  /* height: 100vh; */
`;
