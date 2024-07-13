import styled from "styled-components";

export const BottomTab = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
`;

export const BottomTabItem = styled.div`
  width: 25vw;
  height: 6vh;
  background-color: #adadad;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const BottomTabTitle = styled.p`
  font-size: 1rem;
  font-color: #4f4f4f;
`;

export const BottomTabIcon = styled.img<{ src: string }>`
  src: ${(props) => props.src};
  width: 2rem;
  height: 2rem;
`;
