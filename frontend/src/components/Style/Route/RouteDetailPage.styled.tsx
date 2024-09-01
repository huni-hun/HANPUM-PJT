import { FeedProps } from '@/models/route';
import { colors } from '@/styles/colorPalette';
import styled, { keyframes } from 'styled-components';

interface StyledProps {
  backgroundImg?: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
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
  width: 100%;
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
  height: 80vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImgBox = styled.div<StyledProps>`
  width: 100%;
  height: 29.3rem;
  background-color: #d9d9d9;
  background-size: cover;
  background-position: center;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserContainer = styled.div`
  width: 100%;
  height: 7.8rem;
  display: flex;
  flex-direction: row;
  border-bottom: 0.1rem solid ${colors.grey2};
  align-items: center;
  padding: 1.5rem;
`;

export const UserImgBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin-left: 1.8rem;
`;

export const RouteNameInfo = styled.div`
  width: 85vw;
  height: 20vh;
  display: flex;
  flex-direction: column;
  /* border-bottom: 0.1rem solid #d9d9d9; */
  padding: 2.4rem 0 1rem;
`;

export const RouteNameInfoContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
`;

export const RouteTypeContainer = styled.div`
  width: 100%;
  height: 27%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
`;

export const RouteType = styled.div<{ isLong: boolean }>`
  width: ${(props) => (props ? '7.5rem' : '6.4rem')};
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10rem;
  border: 0.1rem solid ${colors.main};
  color: ${colors.main};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 0.8rem;
  flex-shrink: 1;
`;

export const RouteReviewContainer = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  padding: 0 0.9rem 0 0.9rem;
`;

export const IconContainer = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: start;
  color: ${colors.grey2};
`;

export const IconBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-around;
  color: ${colors.grey2};
`;

export const WriteDateBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
  color: ${colors.grey2};
  padding: 0 0.9rem 0 0.9rem;
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
  position: relative;
  padding-bottom: 2rem;
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

export const RouteDateTilteBox = styled.div`
  width: 100%;
  height: 20%;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: end;
`;

export const RouteDateInfoBox = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

export const RoutePlaceInfoBox = styled.div`
  width: 42%;
  height: 6.4rem;
  background-color: ${colors.grey5};
  display: flex;
  padding: 0 0 0 2rem;
  border-radius: 1.2rem;
  flex-direction: column;
  justify-content: center;
`;

export const PointText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${colors.grey1};
  margin-bottom: 0.8rem;
`;

export const RouteDateTextBox = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: end;
  align-items: start;
  fons-size: 1.2rem;
  color: ${colors.grey2};
`;

export const DateBoldText = styled.p`
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const RouteIconBox = styled.div`
  width: 6rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ArrowBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background-color: ${colors.white};
`;

export const DistanceNumBox = styled.div`
  width: 6rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.main};
  background-color: ${colors.white};
  border-radius: 10rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const PlaceBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const PlaceText = styled.p`
  font-size: 1.2rem;
  color: #c9c9c9;
  .bold-text {
    /* font-size: 1.5rem; */
    color: #787878;
  }
`;

export const DistanceBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-left: 0.1rem solid ${colors.grey1};
  padding: 0 0 0 0.5rem;
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

export const ContentBox = styled.div<{ selected: boolean }>`
  width: 20%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => (props.selected ? '0.6rem solid #1a823b' : '')};
  font-size: 1.4rem;
  font-weight: bold;
  color: #${(props) => (props.selected ? '1a823b' : 'd9d9d9')};
`;

export const RouteDetailInfoContainer = styled.div`
  width: 100vw;
  height: 52vh;
  background-color: #ffffff;
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
  width: 95%;
  height: 100%;
`;

export const RetouchHeaderOverflow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  padding: 0 0 0 1.6rem;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 95%;
  height: 100%;
  border-bottom: 0.15rem solid ${colors.grey1};
`;

export const DayContainer = styled.div`
  width: 7.4rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
`;

export const DayBox = styled.div<{ selected: boolean }>`
  width: 7.4rem;
  height: 3.3rem;
  font-size: 1.6rem;
  font-weight: bold;
  border: 0.2rem solid ${(props) => (props.selected ? '#1a823b' : '#d9d9d9')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  color: ${(props) => (props.selected ? '#1a823b' : '#d9d9d9')};
`;

export const DetailMain = styled.div`
  width: 100%;
  height: 45vh;
  display: flex;
  overflow-y: auto;
  background-color: #ffffff;
`;

export const DetailMainOverflow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 45vh;
  overflow-y: auto;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const swipedIn = keyframes`
  from {
    width: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  to {
    width: 87%;
    left: 0%;
    transform: translate(0, -50%);
  }
`;

const swipedOut = keyframes`
  from {
    width: 87%;
    left: 0%;
    transform: translate(0, -50%);
  }
  to {
    width: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PlaceCardCotainer = styled.div`
  width: 34.3rem;
  height: 8.8rem;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: ${colors.red};
  border-radius: 1.2rem;
  box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: 0.8rem;
  position: relative;
`;

export const PlaceCardDeleteIcon = styled.div`
  width: 3rem;
  height: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 1.2rem;
  color: ${colors.white};
  margin-right: 1.3rem;
`;

export const PlaceCardBox = styled.div<{ isSwiped: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 1.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${(props) => (props.isSwiped ? swipedIn : swipedOut)} 0.5s ease
    forwards;
`;

export const PlaceCard = styled.div`
  width: 31.7rem;
  height: 6.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PlaceTextBox = styled.div`
  width: 70%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

export const CircleBox = styled.div`
  width: 10%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: start;
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
  white-space: nowrap; /* 텍스트가 줄바꿈 없이 한 줄로 유지되도록 설정 */
  overflow: hidden; /* 부모 요소를 넘는 부분을 숨김 */
  text-overflow: clip; /* 넘치는 텍스트를 자르기 */
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
  color: ${colors.grey2};
  white-space: nowrap; /* 텍스트가 줄바꿈 없이 한 줄로 유지되도록 설정 */
  overflow: hidden; /* 부모 요소를 넘는 부분을 숨김 */
  text-overflow: clip; /* 넘치는 텍스트를 자르기 */
`;

export const PlaceImgBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const PlaceImg = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  background-color: #d9d9d9;
  border-radius: 1.2rem;
`;

export const PlaceImage = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 1.2rem;
`;

export const UserImgContainer = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
`;

export const UserImg = styled.div`
  width: 4.2rem;
  height: 4.2rem;
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

export const ReviewHeaderText = styled.p`
  color: ${colors.grey2};
`;

export const ReviewHeaderTextBox = styled.div`
  display: flex;
  flex-direction: row;
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
  font-size: 1rem;
  color: #a0a0a0;
`;

export const HeartBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 3rem 0 0 0;
`;

export const HeartText = styled.p`
  font-size: 1rem;
  color: #a0a0a0;
  margin-top: 0.5rem;
`;

export const MapBox = styled.div`
  width: 100%;
  height: 41rem;
`;
export const BottomContainer = styled.div`
  width: 100vw;
  height: 11.3rem;
  background-color: #ffffff;
  border-radius: 0.8rem 0.8rem 0 0;
  box-shadow: 0 -0.1rem 0.1rem #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonBox = styled.div`
  width: 75%;
  height: 70%;
  display: flex;
  align-items: start;
  justify-content: end;
`;

export const ReviewCardBox = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
`;

export const ReviewCard = styled.div`
  width: 90%;
  height: 9vh;
  display: flex;
  flex-direction: row;
  border-bottom: 0.2rem solid #d9d9d9;
  align-items: center;
`;

export const ReviewHeader = styled.div`
  width: 100%;
  height: 5.1rem;
  display: flex;
  padding: 0 0 0 2.4rem;
  align-items: center;
`;

export const WriteTextBox = styled.div`
  width: 15%;
  height: 70%;
  display: flex;
  justify-content: end;
  padding: 4rem 0 0 0;
  font-size: 1.4rem;
`;

export const AddBtnContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;
