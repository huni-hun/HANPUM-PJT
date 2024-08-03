import styled from "styled-components";

export const Container = styled.div`
  widht: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderButton = styled.div`
  width: 9vw;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

export const OverFlow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  width: 100vw;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CardClosed = styled.div<{ height: number }>`
  width: 80vw;
  height: ${(props) => props.height}vh;
  border-radius: 1.2rem;
  background-color: #ffffff;
  box-shadow: -0.2rem 0.3rem 0.1rem #d9d9d9;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 2.4rem 2.4rem 2.4rem 2.4rem;
`;

export const CardCloseImg = styled.div`
  width: 78vw;
  height: 12vh;
  border-radius: 1.2rem;
  border: 0.2rem solid #d9d9d9;
  margin-top: 1rem;
`;

export const ImgCardOpen = styled.div`
  width: 80vw;
  height: 40vh;
  border-radius: 1.2rem;
  background-color: #ffffff;
  box-shadow: -0.2rem 0.3rem 0.1rem #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 2.4rem 2.4rem 2.4rem;
`;

export const ImgCardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const ImgContainer = styled.div`
  width: 80vw;
  height: 30vh;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const ImgBox = styled.div`
  width: 80vw;
  height: 26vh;
  border-radius: 1.2rem;
  background-color: #d9d9d9;
`;

export const ImgBtnBox = styled.div`
  width: 80vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: end;
`;

export const ExplanationCardOpen = styled.div`
  width: 80vw;
  height: 33vh;
  border-radius: 1.2rem;
  background-color: #ffffff;
  box-shadow: -0.2rem 0.3rem 0.1rem #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 2.4rem 2.4rem 2.4rem;
  margin-top: 2.4rem;
`;

export const ExplanationCardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const ExplanationRoute = styled.textarea`
  width: 78vw;
  height: 14vh;
  border-radius: 1.2rem;
  border: 0.2rem solid #d9d9d9;
  margin-top: 1rem;
  display: flex;
  align-items: start;
  padding: 1rem 1rem 1rem 1rem;
`;

export const CardTitle = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
`;

export const RouteCardHeader = styled.div`
  width: 78vw;
  height: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RouteName = styled.p`
  font-size: 1.2rem;
`;

export const RouteCardMain = styled.div`
  width: 100%;
  height: 30vh;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RouteExplane = styled.textarea`
  width: 100%;
  height: 90%;
  border-radius: 1.2rem;
  border: 0.2rem solid #d9d9d9;
  margin-top: 1rem;
  display: flex;
  align-items: start;
  padding: 1rem 1rem 1rem 1rem;
`;

export const BottomContainer = styled.div`
  width: 100vw;
  height: 13vh;
  background-color: #ffffff;
  border-radius 0.8rem 0.8rem 0 0;  
  box-shadow: 0 -0.1rem 0.1rem #D9D9D9;
  display:flex;
  justify-content: center;
  align-items:center;
`;

export const ButtonBox = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: end;
`;
