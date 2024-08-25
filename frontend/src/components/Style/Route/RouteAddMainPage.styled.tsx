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

export const TypeCardOpen = styled.div<{ isChecked: boolean }>`
  width: 80vw;
  height: ${(props) => (props.isChecked ? '50vh' : '40vh')};
  border-radius: 1.2rem;
  background-color: #ffffff;
  box-shadow: -0.2rem 0.3rem 0.1rem #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2.4rem 2.4rem 2.4rem 2.4rem;
  margin-top: 2.4rem;
`;

export const CheckedTypeContainer = styled.div`
  width: 80vw;
  height: 7vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow-x: auto;
  margin-top: 1rem;
`;

export const CheckedTypeCard = styled.div<{ isLong: boolean }>`
  height: 4.3rem;
  width: ${(props) => (props.isLong ? '9.7rem' : '8.3rem')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-right: 0.7rem;
  border: 0.1rem solid #1a823b;
  border-radius: 1rem;
  flex-shrink: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TypeTextBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;

export const TypeText = styled.p`
  font-size: 1.4rem;
  color: #1a823b;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TypeContainer = styled.div`
  width: 76vw;
  height: 27vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: #e9f3ec;
  padding: 1rem 1rem 1rem 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1.7rem;
`;

export const TypeCheckBox = styled.input`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.2rem;
`;

export const TypeLabel = styled.label`
  font-size: 1.4rem;
  margin-left: 0.2rem;
`;

export const TypeBtnBox = styled.div`
  width: 80vw;
  height: 6vh;
  display: flex;
  align-items: end;
  justify-content: end;
  margin-top: 1rem;
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

export const SwitchBtnBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 1.5rem 0 0 0;
`;

export const SwitchBtnText = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin-top: 0.4rem;
`;

export const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

export const SwitchLabel = styled.label<{ isOpen: boolean }>`
  display: flex;
  position: relative;
  width: 5.6rem;
  height: 3.1rem;
  border-radius: 10rem 10rem 10rem 10rem;
  background-color: ${({ isOpen }) => (isOpen ? '#1A823B' : '#d9d9d9')};
  align-items: center;
  transition: background-color 0.5s;
`;

export const SwitchButton = styled.span<{ isOpen: boolean }>`
  width: 2.7rem;
  height: 2.7rem;
  background-color: #ffffff;
  position: absolute;
  border-radius: 50%;
  left: 0.2rem;
  transition: all 0.5s ease-in-out;
  ${({ isOpen }) =>
    isOpen ? 'transform: translateX(2.4rem)' : 'transform: translateX(0.2rem)'}
`;

export const ButtonBox = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;
