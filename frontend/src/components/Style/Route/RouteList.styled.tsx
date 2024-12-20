import styled from 'styled-components';

export const RouteListContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  box-sizing: border-box;
  /* overflow: scroll; */
  background-color: #ffffff;
  .small-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 0;
    justify-content: space-between;
  }
`;

export const RouteListHeader = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BackBtnBox = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchContainer = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchBox = styled.input`
  type: text;
  width: 90%;
  height: 50%;
  border-radius: 10rem;
  padding: 0 0 0 1.6rem;
  border: 0.2rem solid #e9e9e9;
`;

export const IconContainer = styled.div`
  width: 30vw;
  height: 100%;
  display: flex;
  aling-items: center;
`;

export const IconBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 0px 16px;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: hidden; /* 수평 스크롤 숨김 */
  padding-bottom: 10vh;
`;

export const ButtonContainer = styled.div`
  width: 94vw;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RouteAddBtn = styled.div`
  width: 30.3rem;
  height: 7.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffe784;
  border-radius: 1.2rem;
  padding: 0 2rem 0 2rem;
`;

export const RouteAddBtnTextBox = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const RouteAddBasicText = styled.p`
  font-size: 1.2rem;
`;

export const RouteAddBoldText = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const RouteCardContainer = styled.div`
  width: 100vw;
  height: 23.5rem;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const RouteTypeHeader = styled.div`
  width: 94vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TypeTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  padding-left: 2rem;
`;

export const MoreButton = styled.div`
  width: 4.5rem;
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 3rem;
`;

export const MoreText = styled.p`
  font-size: 1rem;
`;

export const CardContainer = styled.div`
  width: 100vw;
  height: 20rem;
  display: flex;
  flex-direction: row;
`;

export const OverFlow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 94vw;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const BlankBox = styled.div`
  width: 2rem;
  height: 100%;
  display: block;
`;

export const MentContainer = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
`;
