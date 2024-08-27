import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
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

export const ImgCardOpen = styled.div`
  width: 80vw;
  height: 20vh;
  background-color: #ffffff;
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
  height: 14vh;
  border-radius: 1.2rem;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
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
  /* height: 50vh; */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const ExplanationCardTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const ExplanationRoute = styled.textarea`
  height: 13vh;
  border-radius: 1.2rem;
  border: 0.2rem solid #d9d9d9;
  margin-top: 1rem;
  display: flex;
  align-items: start;
  padding: 1rem 1rem 1rem 1rem;
`;

export const FileSelect = styled.input`
  display: none;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
`;

export const ToggleSliderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80vw;
  margin: auto;
  padding: 3rem 0 0 0;
`;

export const SelectEctInfoBox = styled.div`
  width: 100%;
  border: 0.1rem #ccc solid;
  margin-top: 2rem;
`;

export const DeadLineBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-bottom: 0.1rem #ccc solid;
`;

export const ScheduleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  font-size: 1.6rem;
  font-weight: 700;
`;
