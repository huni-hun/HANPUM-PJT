import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
`;

export const Header = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
`;

export const HeaderButton = styled.div`
  width: 9vw;
  height: 7vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.div`
  width: 100vw;
  height: 93vh;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
`;

export const Overflow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const RouteInfoContainer = styled.div`
  width: 100vw;
  height: 75vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgBox = styled.div`
  width: 85vw;
  height: 30vh;
  background-color: #d9d9d9;
  border-radius: 1.2rem;
`;

export const RouteNameInfo = styled.div`
  width: 85vw;
  height: 15vh;
  display: flex;
  flex-direction: column;
  border-bottom: 0.1rem solid #d9d9d9;
  padding: 2.4rem 0 1rem 0;
`;

export const RouteName = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

export const RouteInfo = styled.p`
  color: #c9c9c9;
  font-size: 1.4rem;
`;

export const RouteDateBox = styled.div`
  width: 85vw;
  height: 19vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StartDateBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const EndDateBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DateText = styled.p`
  font-size: 1.2rem;
  color: #c9c9c9;
`;

export const DistanceBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const DistanceText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #c9c9c9;
`;

export const Distance = styled.p`
  font-size: 1rem;
  color: #c9c9c9;
`;

export const ContentSelecContainer = styled.div`
  width: 100vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  border-bottom: 0.1rem solid #d9d9d9;
  border-top: 0.1rem solid #d9d9d9;
  justify-content: space-around;
`;

export const ContentBox = styled.div<{ isSelected: boolean }>`
  width: 20%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => (props.isSelected ? '0.6rem solid #1a823b' : '')};
  font-size: 1.4rem;
  font-weight: bold;
  color: #${(props) => (props.isSelected ? '1a823b' : 'd9d9d9')};
`;

export const RouteDetailInfoContainer = styled.div`
  width: 100vw;
  height: 52vh;
`;

export const DetailHeader = styled.div`
  width: 100vw;
  height: 7vh;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const DetailHeaderTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const HeaderOverflow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  padding: 0 0 0 1.6rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: 100%;
`;

export const DayContainer = styled.div`
  width: 7.4rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;

export const DayBox = styled.div<{ isSelected: boolean }>`
  width: 7.4rem;
  height: 3.3rem;
  font-size: 1.6rem;
  font-weight: bold;
  border: 0.2rem solid ${(props) => (props.isSelected ? '#1a823b' : '#d9d9d9')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  color: ${(props) => (props.isSelected ? '#1a823b' : '#d9d9d9')};
`;

export const DetailMain = styled.div`
  width: 100%;
  height: 45vh;
  display: flex;
  overflow-y: auto;
`;

export const DetailMainOverflow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PlaceCardBox = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
`;

export const PlaceCard = styled.div`
  width: 90%;
  height: 9vh;
  display: flex;
  flex-direction: row;
  border-bottom: 0.2rem solid #d9d9d9;
  align-items: center;
`;

export const PlaceTextBox = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CircleBox = styled.div`
  width: 10%;
  height: 80%;
  display: flex;
  flex-direction: row;
  algin-items: start;
  justify-content: center;
`;

export const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #1a823b;
  margin-top: 0.3rem;
`;

export const TextBox = styled.div`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

export const PlacetTitleBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: start;
`;

export const TypeBox = styled.div`
  width: auto;
  height: 1.6rem;
  font-size: 1.2rem;
  color: #a0a0a0;
  display: flex;
  align-items: end;
  margin-left: 0.4rem;
`;

export const Title = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
`;

export const PlacetAddressBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
`;

export const PlaceImgBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const PlaceImg = styled.div`
  width: 7.3rem;
  height: 7.3rem;
  background-color: #d9d9d9;
`;

export const UserImgContainer = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: end;
`;

export const UserImg = styled.div`
  width: 3.1rem;
  height: 3.1rem;
  border-radius: 50%;
  border: 1px solid #1a823b;
  background-color: #bdd8c5;
  display: flex;
  justify-content: center;
  align-items: end;
`;

export const ReviewTextcontainer = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ReviewTextBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export const ReviewNameBox = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: end;
  padding: 0 0 0 0.8rem;
`;

export const ReviewName = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: 0.4rem;
`;

export const ReviewRate = styled.p`
  font-size: 1rem;
  color: #1a823b;
  font-weight: 500;
  margin-left: 0.2rem;
`;

export const ReviewDetailBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 0.8rem;
`;

export const ReviewDetail = styled.p`
  font-size: 1.2rem;
`;

export const ReviewDateBox = styled.div`
  width: 100%;
  height: 30%;
  padding: 0 0 0 0.8rem;
  align-items: center;
`;

export const ReviewDate = styled.p`
  font-size: 0.8rem;
  color: #a0a0a0;
`;

export const HeartBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0 0 0;
`;

export const HeartText = styled.p`
  font-size: 1rem;
  color: #a0a0a0;
  margin-top: 0.5rem;
`;
