import styled from 'styled-components';

export const ListContainer = styled.div`
  width: 100%;
  height: 100vw;
`;

export const ListItem = styled.div`
  width: 100%;
  height: 20vw;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 0.1rem #ccc solid;
  box-sizing: border-box;
`;

export const MemberImg = styled.div`
  width: 15vw;
  height: 15vw;

  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
  }
`;
export const MemberName = styled.div`
  font-size: 2rem;
  margin-left: 2rem;
`;
