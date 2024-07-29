import * as C from "./RouteCard.styled";

import Icon from "../../common/Icon/Icon";

function RouteCard() {
  return (
    <C.Card img={""}>
      <C.TopContent>
        <C.ContentContainer>
          <C.Content>
            <Icon name="IconRoute" size={25} />
            <C.ContentText>70.5km</C.ContentText>
          </C.Content>
          <C.Content>
            <Icon name="IconCalendar" size={25} />
            <C.ContentText>5박 6일</C.ContentText>
          </C.Content>
        </C.ContentContainer>
        <Icon name="IconBookMarkerWhite" size={20} />
      </C.TopContent>
      <C.BottomContent>
        <Icon name="IconFlag" size={30} />
        <C.RouteNTitleBox>
          <C.RouteBox>
            <C.RouteText>인천</C.RouteText>
            <Icon name="IconArrowWhite" size={10} path="" />
            <C.RouteText>당진</C.RouteText>
          </C.RouteBox>
          <C.TitleBox>무더위 사냥</C.TitleBox>
        </C.RouteNTitleBox>
        <C.Datecontainer>
          <C.DateBox>5박6일</C.DateBox>
        </C.Datecontainer>
      </C.BottomContent>
    </C.Card>
  );
}

export default RouteCard;
