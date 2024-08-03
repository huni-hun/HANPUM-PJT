import Icon from "../components/common/Icon/Icon";
import * as Ra from "../components/Detail/Route/RouteAddPagePlace.styled";

import TestImg from "../assets/test.jpg";
import Button from "../components/common/Button/Button";
import Map from "../components/common/Map/Map";

function RouteAddPlacePage() {
  return (
    <Ra.Container>
      <Ra.Header>
        <Ra.HeaderButton>
          <Icon name="IconBack" size={20} />
        </Ra.HeaderButton>
        <Ra.HeaderTitle>대천 해수욕장</Ra.HeaderTitle>
      </Ra.Header>
      <Ra.MapContainer>
        <Map latitude={36.3055967} longitude={126.5160485} />
      </Ra.MapContainer>
      <Ra.PlaceBottomContainer>
        <Ra.PlaceContainer>
          <Ra.PlaceContent>
            <Ra.PlaceImg src={TestImg} />
            <Ra.PlaceTextBox>
              <Ra.PlaceNameBox>
                <Ra.PlaceName>대천 해수욕장</Ra.PlaceName>
                <Ra.PlaceType>관광지</Ra.PlaceType>
              </Ra.PlaceNameBox>
              <Ra.PlaceAddressBox>
                <Ra.PlaceAddress>충남 보령시 신흑동</Ra.PlaceAddress>
              </Ra.PlaceAddressBox>
            </Ra.PlaceTextBox>
          </Ra.PlaceContent>
          <Ra.AddBtnContainer>
            <Button
              width={25}
              height={6}
              fontColor="ffffff"
              backgroundColor="#1A823B"
              radius={0.7}
              fontSize={1.6}
              children="추가"
              color="#ffffff"
              onClick={() => {}}
            />
          </Ra.AddBtnContainer>
        </Ra.PlaceContainer>
      </Ra.PlaceBottomContainer>
    </Ra.Container>
  );
}

export default RouteAddPlacePage;
