import Button from "../components/common/Button/Button";
import Icon from "../components/common/Icon/Icon";
import RouteCard from "../components/Detail/Route/RouteCard";
import * as R from "../components/Detail/Route/RouteList.styled";

function RouteList() {
  return (
    <R.RouteListContainer>
      <R.RouteListHeader>
        <R.BackBtnBox>
          <Icon name="IconBack" size={20} />
        </R.BackBtnBox>
        <R.SearchContainer>
          <R.SearchBox />
        </R.SearchContainer>
        <R.IconContainer>
          <R.IconBox>
            <Icon name="IconBookMarker" size={20} />
          </R.IconBox>
          <R.IconBox>
            <Icon name="IconNotification" size={20} />
          </R.IconBox>
          <R.IconBox>
            <Icon name="IconMy" size={20} />
          </R.IconBox>
        </R.IconContainer>
      </R.RouteListHeader>
      <R.MainContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
        <R.RouteCardContainer>
          <R.RouteTypeHeader>
            <R.TypeTitle>지금 가장 인기 있는 코스</R.TypeTitle>
            <R.MoreButton>
              <R.MoreText>더보기</R.MoreText>
              <Icon name="IconArrow" size={10} />
            </R.MoreButton>
          </R.RouteTypeHeader>
          <R.CardContainer>
            <R.BlankBox />
            <R.OverFlow>
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
              <RouteCard />
            </R.OverFlow>
          </R.CardContainer>
        </R.RouteCardContainer>
      </R.MainContainer>
      <R.ButtonContainer>
        <Button
          width={90}
          height={7}
          fontColor="ffffff"
          backgroundColor="#A0A0A0"
          radius={0.7}
          fontSize={1.6}
          children="나의 경로 만들기"
          color=""
          onClick={() => {}}
        />
      </R.ButtonContainer>
    </R.RouteListContainer>
  );
}

export default RouteList;
