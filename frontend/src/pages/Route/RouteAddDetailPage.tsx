import Button from '@/components/common/Button/Button';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import Map from '@/components/common/Map/Map';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import SearchPlacePage from './SearchPlacePage';
import {
  AddRouteProps,
  AttractionsAddProps,
  AttractionsProps,
  DateRouteDetailProps,
  WayPointListProps,
} from '@/models/route';
import RoutePlaceCard from '@/components/Style/Route/RoutePlaceCard';
import { colors } from '@/styles/colorPalette';

function RouteAddDetailPage() {
  const [curLatitude, setCurLatitude] = useState<number>(0);
  const [curLongtitude, setCurLongtitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [route, setRoute] = useState<number[]>([1]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [addRoute, setAddRoute] = useState<AddRouteProps>(null!);
  const [dateDetail, setDateDetail] = useState<DateRouteDetailProps[]>([]);
  const [wayPoints, setWayPoints] = useState<WayPointListProps[]>([]);
  const [attractions, setAttractions] = useState<AttractionsAddProps[]>([]);
  const [pointType, setPointType] = useState<string>('wp');

  const location = useLocation();
  const data = { ...location.state };

  const getSuccess = (pos: GeolocationPosition) => {
    setCurLatitude(pos.coords.latitude);
    setCurLongtitude(pos.coords.longitude);
    setLoading(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      getSuccess,
      () => {
        alert('위치 가져오기 실패');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );

    let route: AddRouteProps = {
      memberId: 1,
      routeName: data.routeTitle,
      routeContent: data.routeExplane,
      openState: data.isOpen,
      writeState: false,
      routeType: data.typeChecked,
      dateOfRoute: [],
    };

    setAddRoute(route);
  }, []);

  useEffect(() => {
    console.log(dateDetail);
  }, [dateDetail]);

  useEffect(() => {
    if (dateDetail.length < route.length) {
      let newDate: DateRouteDetailProps = {
        date: route[route.length - 1],
        wayPointList: [],
        attractionsList: [],
      };
      setDateDetail((pre) => [...pre, newDate]);
    }
  }, [route]);

  useEffect(() => {
    // if (route.includes(selectedDay)) {
    //   dateDetail.map((ele: DateRouteDetailProps) => {
    //     if (ele.date === selectedDay) {
    //       setWayPoints(ele.wayPointList);
    //     }
    //   });
    // }
    dateDetail.map((ele: DateRouteDetailProps) => {
      if (ele.date === selectedDay) {
        setWayPoints(ele.wayPointList);
        setAttractions(ele.attractionsList);
      }
    });
    console.log(dateDetail);
  }, [selectedDay]);

  return searchOpen ? (
    <SearchPlacePage
      pointType={pointType}
      attractions={attractions}
      setAttractions={setAttractions}
      day={selectedDay}
      dateDetail={dateDetail}
      setDateDetail={setDateDetail}
      setSearchOpen={setSearchOpen}
      setWayPoints={setWayPoints}
      wayPoints={wayPoints}
    />
  ) : (
    <R.Container>
      <Header
        purpose="root"
        depart="서울"
        arrive="대전"
        clickBack={() => {}}
        back={true}
      />
      <R.MainContainer>
        <R.OverFlow>
          <R.DayContainer>
            <R.DayOverFlow>
              {route.map((ele) => (
                <R.DayCard
                  isSelected={selectedDay === ele}
                  onClick={() => {
                    setSelectedDay(ele);
                  }}
                >{`Day ${ele}`}</R.DayCard>
              ))}
              <R.DatAddCard
                onClick={() => {
                  setRoute((pre) => [...pre, day + 1]);
                  setDay(day + 1);
                }}
              >
                +
              </R.DatAddCard>
            </R.DayOverFlow>
          </R.DayContainer>
          <R.MapCard>
            <R.MapCardTitle>
              {selectedDay}일차 경로를 설정해주세요.
            </R.MapCardTitle>
            <R.MapSearchBox
              onClick={() => {
                setPointType('wp');
                setSearchOpen(true);
              }}
            >
              <Icon name="IconSearch" size={20} />
              <R.SearchText>위치 검색</R.SearchText>
            </R.MapSearchBox>
            <R.MapBox>
              {loading ? (
                <Map latitude={curLatitude} longitude={curLongtitude} />
              ) : null}
            </R.MapBox>
            <R.PlaceContainer>
              <R.PlaceBox>
                <R.PlaceTypeBox>경유지</R.PlaceTypeBox>
                <R.DetailWayOverflow>
                  {wayPoints.map((ele: WayPointListProps, idx: number) => (
                    <RoutePlaceCard
                      routeAddress={ele.address}
                      routeId={1}
                      routeName={ele.name}
                      routeType={ele.type}
                      latitude={ele.latitude}
                      longitude={ele.longitude}
                      routePoint={`${ele.point}`}
                    />
                  ))}
                </R.DetailWayOverflow>
              </R.PlaceBox>
              <R.AttractionsBox>
                <R.AttrantiosTypeBox>관광지</R.AttrantiosTypeBox>
                <R.AttractionsOverflow>
                  {attractions.length > 0 &&
                    attractions.map((ele: AttractionsAddProps) => (
                      <R.AttractionCard img={ele.img}>
                        <R.AttractionCardTitle>TEST</R.AttractionCardTitle>
                        <R.AttractionCardDetail>
                          <Icon name="IconFlag" size={20} />
                          {ele.name}
                        </R.AttractionCardDetail>
                      </R.AttractionCard>
                    ))}
                  <R.AttractionAddCard
                    onClick={() => {
                      setPointType('att');
                      setSearchOpen(true);
                    }}
                  >
                    +
                  </R.AttractionAddCard>
                </R.AttractionsOverflow>
              </R.AttractionsBox>
            </R.PlaceContainer>
          </R.MapCard>
        </R.OverFlow>
      </R.MainContainer>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={30}
            height={6}
            fontColor="ffffff"
            backgroundColor={colors.main}
            radius={0.7}
            fontSize={1.6}
            children="경로완성"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddDetailPage;
