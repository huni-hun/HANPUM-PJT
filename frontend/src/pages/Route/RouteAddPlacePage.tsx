import Icon from '../../components/common/Icon/Icon';
import * as Ra from '../../components/Style/Route/RouteAddPagePlace.styled';

import Button from '../../components/common/Button/Button';
import Map from '../../components/common/Map/Map';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import {
  AttractionsAddCardProps,
  AttractionReqDto,
  CourseDayReqDto,
  searchPlaceProps,
  WayPointReqDto,
} from '@/models/route';
import { toast } from 'react-toastify';

interface RouteAddPagePlaceProps {
  selectedPlace: searchPlaceProps;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setWayPoints: React.Dispatch<React.SetStateAction<WayPointReqDto[]>>;
  wayPoints: WayPointReqDto[];
  setDateDetail: React.Dispatch<React.SetStateAction<CourseDayReqDto[]>>;
  dateDetail: CourseDayReqDto[];
  day: number;
  setAttractions: React.Dispatch<React.SetStateAction<AttractionReqDto[]>>;
  attractions: AttractionReqDto[];
  pointType: string;
  setAttractionsCard: React.Dispatch<
    React.SetStateAction<AttractionsAddCardProps[]>
  >;
  attractionsCard: AttractionsAddCardProps[];
  keyword: string;
}

function RouteAddPlacePage(props: RouteAddPagePlaceProps) {
  const navigator = useNavigate();

  const setWayPoint = () => {
    if (props.wayPoints.length < 10) {
      let way: WayPointReqDto = {
        type: '경유지',
        name: props.selectedPlace.placeName,
        address: props.selectedPlace.address,
        lat: props.selectedPlace.latitude,
        lon: props.selectedPlace.longitude,
        pointNumber: `${props.wayPoints.length + 1}`,
        distance: '0',
        duration: '0',
        calorie: '0',
      };

      props.setWayPoints((pre) => {
        const updatedWayPoints = [...pre, way];

        let newDateDetail: CourseDayReqDto[] = [...props.dateDetail];
        newDateDetail.map((ele: CourseDayReqDto) => {
          if (ele.dayNumber === props.day) {
            ele.wayPointReqDtoList = updatedWayPoints;
          }
        });
        props.setDateDetail(newDateDetail);

        return updatedWayPoints;
      });

      props.setPageOpen(false);
      props.setSearchOpen(false);
    } else {
      toast.error('경유지는 하루에 10개를 초과할 수 없습니다.');
      props.setPageOpen(false);
      props.setSearchOpen(false);
    }
  };

  const setAttraction = () => {
    let attraction: AttractionReqDto = {
      name: props.selectedPlace.placeName,
      address: props.selectedPlace.address,
      lat: props.selectedPlace.longitude,
      lon: props.selectedPlace.latitude,
      img: props.selectedPlace.img as string,
      type: '관광지',
    };

    let attractionCardInfo: AttractionsAddCardProps = {
      keyword: props.keyword,
      name: props.selectedPlace.placeName,
      img: props.selectedPlace.img as string,
    };

    props.setAttractionsCard((pre) => [...pre, attractionCardInfo]);

    props.setAttractions((pre) => {
      const updatedAttractions = [...pre, attraction];

      let newDateDetail: CourseDayReqDto[] = [...props.dateDetail];
      newDateDetail.map((ele: CourseDayReqDto) => {
        if (ele.dayNumber === props.day) {
          ele.attractionReqDtoList = updatedAttractions;
        }
      });
      props.setDateDetail(newDateDetail);

      return updatedAttractions;
    });

    props.setPageOpen(false);
    props.setSearchOpen(false);
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
          infoBtn
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
              fc="ffffff"
              bc="#1A823B"
              radius={0.7}
              fontSize={1.6}
              children={
                props.pointType === 'wp' ? '경유지 추가' : '관광지 추가'
              }
              color="#ffffff"
              onClick={() => {
                if (props.pointType === 'wp') {
                  setWayPoint();
                } else {
                  setAttraction();
                }
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
