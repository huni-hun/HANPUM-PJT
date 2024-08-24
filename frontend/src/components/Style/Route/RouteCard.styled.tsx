import styled from 'styled-components';

export const Card = styled.div<{ img: string }>`
  min-width: 14.6rem;
  height: 14.6rem;
  border-radius: 1.2rem;
  display: flex;
  margin-right: 0.8rem;
  padding: 1rem 1rem 1rem 1rem;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TopContent = styled.div`
  width: 14rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  margin-right: 0.8rem;
`;

export const BContent = styled.div`
  width: 4.3rem;
  height: 4.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  background: #000000;
  margin-right: 0.8rem;
`;

export const ContentText = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-left: 0.4rem;
`;

export const BContentText = styled.p`
  font-size: 1rem;
  color: #ffffff;
`;

export const BottomContent = styled.div`
  width: 15rem;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const RouteNTitleBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const RouteBox = styled.div`
  width: 70%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

export const RouteText = styled.div`
  font-size: 1rem;
  color: #ffffff;
`;

export const TitleBox = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
`;

export const Datecontainer = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  align-items: end;
  justify-content: center;
`;

export const DateBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a823b;
  border-radius: 10rem;
  border: 0.1rem solid #ffffff;
  color: #ffffff;
`;
