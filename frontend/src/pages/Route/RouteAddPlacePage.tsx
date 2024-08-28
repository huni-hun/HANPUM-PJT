import Icon from '../../components/common/Icon/Icon';
import * as Ra from '../../components/Style/Route/RouteAddPagePlace.styled';

import Button from '../../components/common/Button/Button';
import Map from '../../components/common/Map/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import {
  AttractionsAddProps,
  DateRouteDetailProps,
  searchPlaceProps,
  WayPointListProps,
} from '@/models/route';

interface RouteAddPagePlaceProps {
  selectedPlace: searchPlaceProps;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWayPoints: React.Dispatch<React.SetStateAction<WayPointListProps[]>>;
  wayPoints: WayPointListProps[];
  setDateDetail: React.Dispatch<React.SetStateAction<DateRouteDetailProps[]>>;
  dateDetail: DateRouteDetailProps[];
  day: number;
  setAttractions: React.Dispatch<React.SetStateAction<AttractionsAddProps[]>>;
  attractions: AttractionsAddProps[];
  pointType: string;
}

function RouteAddPlacePage(props: RouteAddPagePlaceProps) {
  const navigator = useNavigate();

  const setWayPoint = () => {
    let way: WayPointListProps = {
      type: '경유지',
      name: props.selectedPlace.placeName,
      address: props.selectedPlace.address,
      latitude: props.selectedPlace.latitude,
      longitude: props.selectedPlace.longitude,
      point: props.wayPoints.length + 1,
      distance: 123,
      duration: 432,
      calorie: 123,
    };

    props.setWayPoints((pre) => {
      const updatedWayPoints = [...pre, way];

      let newDateDetail: DateRouteDetailProps[] = [...props.dateDetail];
      newDateDetail.map((ele: DateRouteDetailProps) => {
        if (ele.date === props.day) {
          ele.wayPointList = updatedWayPoints;
        }
      });
      props.setDateDetail(newDateDetail);

      return updatedWayPoints;
    });
  };

  const setAttraction = () => {
    let attraction: AttractionsAddProps = {
      name: props.selectedPlace.placeName,
      address: props.selectedPlace.address,
      latitude: props.selectedPlace.latitude,
      longitude: props.selectedPlace.longitude,
      img: props.selectedPlace.img as string,
    };

    props.setAttractions((pre) => {
      const updatedWayPoints = [...pre, attraction];

      let newDateDetail: DateRouteDetailProps[] = [...props.dateDetail];
      newDateDetail.map((ele: DateRouteDetailProps) => {
        if (ele.date === props.day) {
          ele.attractionsList = updatedWayPoints;
        }
      });
      props.setDateDetail(newDateDetail);

      return updatedWayPoints;
    });
  };

  // console.log(placeInfo);
  return (
    <Ra.Container>
      <Header
        purpose="result"
        title={props.selectedPlace.placeName}
        clickBack={() => {
          props.setPageOpen(false);
        }}
      />
      <Ra.MapContainer>
        <Map
          latitude={props.selectedPlace.longitude}
          longitude={props.selectedPlace.latitude}
        />
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
                <Ra.PlaceName>{props.selectedPlace.placeName}</Ra.PlaceName>
              </Ra.PlaceNameBox>
              <Ra.PlaceAddressBox>
                <Ra.PlaceAddress>{props.selectedPlace.address}</Ra.PlaceAddress>
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
              onClick={() => {
                setAttraction();
              }}
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
              onClick={() => {
                setWayPoint();
              }}
              fontWeight="bold"
            />
          </Ra.AddBtnContainer>
        </Ra.PlaceContainer>
      </Ra.PlaceBottomContainer>
    </Ra.Container>
  );
}

export default RouteAddPlacePage;
