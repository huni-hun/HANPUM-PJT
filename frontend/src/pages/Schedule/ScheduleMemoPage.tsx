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
  selectedPlace?: searchPlaceProps;
  setSearchOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setPageOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setWayPoints?: React.Dispatch<React.SetStateAction<WayPointReqDto[]>>;
  wayPoints?: WayPointReqDto[];
  setDateDetail?: React.Dispatch<React.SetStateAction<CourseDayReqDto[]>>;
  dateDetail?: CourseDayReqDto[];
  day?: number;
  setAttractions?: React.Dispatch<React.SetStateAction<AttractionReqDto[]>>;
  attractions?: AttractionReqDto[];
  pointType?: string;
  setAttractionsCard?: React.Dispatch<
    React.SetStateAction<AttractionsAddCardProps[]>
  >;
  attractionsCard?: AttractionsAddCardProps[];
  keyword?: string;
}

function ScheduleMemoPage(props: RouteAddPagePlaceProps) {
  const navigator = useNavigate();

  const setWayPoint = () => {
    if (props?.wayPoints?.length || 0 < 10) {
      let way: WayPointReqDto = {
        type: '경유지',
        name: props?.selectedPlace?.placeName || '',
        address: props?.selectedPlace?.address || '',
        lat: props?.selectedPlace?.latitude || 0,
        lon: props?.selectedPlace?.longitude || 0,
        pointNumber: `${props?.wayPoints?.length || 0 + 1}`,
        distance: '0',
        duration: '0',
        calorie: '0',
      };

      if (props?.setWayPoints) {
        props.setWayPoints((pre) => {
          const updatedWayPoints = [...pre, way];

          let newDateDetail: CourseDayReqDto[] = [...(props?.dateDetail || [])];
          newDateDetail = newDateDetail.map((ele: CourseDayReqDto) => {
            if (ele.dayNumber === props?.day) {
              ele.wayPointReqDtoList = updatedWayPoints;
            }
            return ele;
          });

          if (props?.setDateDetail) {
            props.setDateDetail(newDateDetail);
          }

          return updatedWayPoints;
        });
      }

      if (props?.setPageOpen) {
        props.setPageOpen(false);
      }

      if (props?.setSearchOpen) {
        props.setSearchOpen(false);
      }
    } else {
      toast.error('경유지는 하루에 10개를 초과할 수 없습니다.');
      if (props?.setPageOpen) {
        props.setPageOpen(false);
      }

      if (props?.setSearchOpen) {
        props.setSearchOpen(false);
      }
    }
  };

  const setAttraction = () => {
    let attraction: AttractionReqDto = {
      name: props?.selectedPlace?.placeName || '',
      address: props?.selectedPlace?.address || '',
      lat: props?.selectedPlace?.longitude || 0,
      lon: props?.selectedPlace?.latitude || 0,
      img: props?.selectedPlace?.img as string,
      type: '관광지',
    };

    let attractionCardInfo: AttractionsAddCardProps = {
      keyword: props.keyword || '',
      name: props?.selectedPlace?.placeName || '',
      img: props.selectedPlace?.img as string,
    };

    if (props?.setAttractionsCard) {
      props.setAttractionsCard((pre) => [...pre, attractionCardInfo]);
    }

    if (props?.setAttractions) {
      props.setAttractions((pre) => {
        const updatedAttractions = [...pre, attraction];

        let newDateDetail: CourseDayReqDto[] = [...(props?.dateDetail || [])];
        newDateDetail = newDateDetail.map((ele: CourseDayReqDto) => {
          if (ele.dayNumber === props?.day) {
            ele.attractionReqDtoList = updatedAttractions;
          }
          return ele; // map 함수에서는 반드시 반환값이 있어야 함
        });

        if (props?.setDateDetail) {
          props.setDateDetail(newDateDetail);
        }

        return updatedAttractions;
      });
    }

    if (props?.setPageOpen) {
      props.setPageOpen(false);
    }

    if (props?.setSearchOpen) {
      props.setSearchOpen(false);
    }
  };

  return (
    <Ra.Container>
      <Header
        purpose="result"
        title={props?.selectedPlace?.placeName}
        clickBack={() => {
          if (props?.setPageOpen) {
            props.setPageOpen(false);
          }
        }}
      />
      <Ra.MapContainer>
        <Map
          latitude={props?.selectedPlace?.longitude || 0}
          longitude={props?.selectedPlace?.latitude || 0}
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
                <Ra.PlaceName>{props?.selectedPlace?.placeName}</Ra.PlaceName>
              </Ra.PlaceNameBox>
              <Ra.PlaceAddressBox>
                <Ra.PlaceAddress>
                  {props?.selectedPlace?.address}
                </Ra.PlaceAddress>
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

export default ScheduleMemoPage;
