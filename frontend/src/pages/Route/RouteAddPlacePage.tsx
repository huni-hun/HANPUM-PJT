import Icon from '../../components/common/Icon/Icon';
import * as Ra from '../../components/Style/Route/RouteAddPagePlace.styled';

import Button from '../../components/common/Button/Button';
import Map from '../../components/common/Map/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';

function RouteAddPlacePage() {
  const location = useLocation();
  const navigator = useNavigate();
  const placeInfo = { ...location.state };
  console.log(placeInfo);
  return (
    <Ra.Container>
      <Header
        purpose="result"
        title={placeInfo.placeName}
        clickBack={() => {
          navigator(-1);
        }}
      />
      <Ra.MapContainer>
        <Map latitude={placeInfo.longitude} longitude={placeInfo.latitude} />
      </Ra.MapContainer>
      <Ra.PlaceBottomContainer>
        <Ra.PlaceContainer>
          <Ra.PlaceContent>
            <Ra.CircleContainer>
              <Ra.CircleBox>
                <Ra.CircleBorder>
                  <Ra.Circle />
                </Ra.CircleBorder>
              </Ra.CircleBox>
            </Ra.CircleContainer>
            <Ra.PlaceTextBox>
              <Ra.PlaceNameBox>
                <Ra.PlaceName>{placeInfo.placeName}</Ra.PlaceName>
              </Ra.PlaceNameBox>
              <Ra.PlaceAddressBox>
                <Ra.PlaceAddress>{placeInfo.address}</Ra.PlaceAddress>
              </Ra.PlaceAddressBox>
            </Ra.PlaceTextBox>
          </Ra.PlaceContent>
          <Ra.AddBtnContainer>
            <Button
              width={35}
              height={6}
              fontColor="1A823B"
              backgroundColor="#ffffff"
              radius={0.7}
              fontSize={1.6}
              children="관광지 추가"
              color="#1A823B"
              onClick={() => {}}
              fontWeight="bold"
            />
            <Button
              width={35}
              height={6}
              fontColor="ffffff"
              backgroundColor="#1A823B"
              radius={0.7}
              fontSize={1.6}
              children="경유지 추가"
              color="#ffffff"
              onClick={() => {}}
              fontWeight="bold"
            />
          </Ra.AddBtnContainer>
        </Ra.PlaceContainer>
      </Ra.PlaceBottomContainer>
    </Ra.Container>
  );
}

export default RouteAddPlacePage;
