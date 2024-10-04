import Button from '@/components/common/Button/Button';
import * as R from '../../components/Style/Route/RouteAddDetailPage.styled';
import Icon from '@/components/common/Icon/Icon';
import Map from '@/components/common/Map/Map';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header/Header';
import SearchPlacePage from './SearchPlacePage';
import {
  AddRouteProps,
  AttractionsAddCardProps,
  AttractionReqDto,
  AttractionsProps,
  CourseDayReqDto,
  WayPointReqDto,
  LineStartEndProps,
  MapLinePathProps,
  DaysOfRouteProps,
} from '@/models/route';
import RoutePlaceCard from '@/components/Style/Route/RoutePlaceCard';
import { colors } from '@/styles/colorPalette';
import {
  AddRoute,
  GetDistance,
  GetLineData,
  GetLineDataKakao,
} from '@/api/route/POST';
import { toast } from 'react-toastify';
import { cutAddress } from '@/utils/util';

function RouteAddDetailPage() {
  const [curLatitude, setCurLatitude] = useState<number>(0);
  const [curLongtitude, setCurLongtitude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [route, setRoute] = useState<number[]>([1]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [addRoute, setAddRoute] = useState<AddRouteProps>(null!);
  const [dateDetail, setDateDetail] = useState<CourseDayReqDto[]>([]);
  const [wayPoints, setWayPoints] = useState<WayPointReqDto[]>([]);
  const [attractions, setAttractions] = useState<AttractionReqDto[]>([]);
  const [attractionsCard, setAttractionsCard] = useState<
    AttractionsAddCardProps[]
  >([]);
  const [pointType, setPointType] = useState<string>('wp');
  const [colorValue, setColorValue] = useState<string>('');
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [attmarker, setAttMarker] = useState<LineStartEndProps[]>([]);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [kakaolinePath, setKakaoLinePath] = useState<MapLinePathProps[]>([]);
  const [se, setSe] = useState<LineStartEndProps[]>([]);
  const [mapLines, setMapLines] = useState<any[]>([]);

  const location = useLocation();
  const data = { ...location.state };
  const navigate = useNavigate();

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
      courseName: data.routeTitle,
      content: data.routeExplane,
      openState: data.isOpen,
      writeState: false,
      courseTypeList: data.typeChecked,
      courseDayReqDtoList: [],
      multipartFile: data.imgSrc,
    };
    setColorValue(colors.grey1);
    setAddRoute(route);
  }, []);

  // useEffect(() => {
  //   console.log(dateDetail);
  // }, [dateDetail]);

  // useEffect(() => {
  //   console.log(addRoute);
  // }, [addRoute]);

  useEffect(() => {
    setMarker([]);
    let lines: MapLinePathProps[] = [];
    let kakaose: LineStartEndProps[] = [];
    let kakaoData: MapLinePathProps[] = [];
    wayPoints.map((ele: WayPointReqDto, idx: number) => {
      let markerData: LineStartEndProps = {
        x: ele.lat,
        y: ele.lon,
      };
      let line: MapLinePathProps = {
        name: ele.name,
        x: ele.lat,
        y: ele.lon,
      };
      if (idx === 0 || idx === wayPoints.length - 1) {
        let kse: LineStartEndProps = {
          x: ele.lat,
          y: ele.lon,
        };
        kakaose.push(kse);
      } else {
        kakaoData.push(line);
      }
      lines.push(line);
      setMarker((pre) => [...pre, markerData]);
    });
    setSe(kakaose);
    setKakaoLinePath(kakaoData);
    setLinePath(lines);
  }, [wayPoints]);

  useEffect(() => {
    setAttMarker([]);
    let arr: AttractionsAddCardProps[] = [];
    attractions.map((ele: AttractionReqDto) => {
      let markerData: LineStartEndProps = {
        x: ele.lat,
        y: ele.lon,
      };
      let cardData: AttractionsAddCardProps = {
        name: ele.name,
        img: ele.image,
        keyword: ele.name,
      };
      arr.push(cardData);
      setAttMarker((pre) => [...pre, markerData]);
    });

    setAttractionsCard(arr);
    // console.log(dateDetail);
  }, [attractions]);

  useEffect(() => {
    if (linePath.length > 1) {
      const mapLinesArr: any[] = [];
      const mapLinesTotal: any[] = [];
      let previousVertex: any = null; // 이전 그룹의 마지막 좌표를 저장할 변수

      if (linePath.length <= 5) {
        GetLineData(linePath)
          .then((res) => {
            if (res.status === 200 && res.data.status === 'SUCCESS') {
              res.data.data.forEach((ele: any, idx: number) => {
                wayPoints.map((el: WayPointReqDto, i: number) => {
                  if (idx === i) {
                    el.vertexes = ele.vertexes;
                  }
                });

                ele.vertexes.forEach((vertex: any, index: number) => {
                  if (index % 2 === 0) {
                    mapLinesArr.push(
                      new window.kakao.maps.LatLng(
                        ele.vertexes[index + 1],
                        ele.vertexes[index],
                      ),
                    );
                  }
                });
              });
              setMapLines([...mapLinesArr]);
            }
          })
          .catch((err) => {
            GetLineDataKakao(se[0], se[1], kakaolinePath)
              .then((result) => {
                if (result.status === 200 && result.data.status === 'SUCCESS') {
                  result.data.data.forEach((ele: any, idx: number) => {
                    wayPoints.map((el: WayPointReqDto, i: number) => {
                      if (idx === i) {
                        el.vertexes = ele.vertexes;
                      }
                    });

                    ele.vertexes.forEach((vertex: any, index: number) => {
                      if (index % 2 === 0) {
                        mapLinesArr.push(
                          new window.kakao.maps.LatLng(
                            ele.vertexes[index + 1],
                            ele.vertexes[index],
                          ),
                        );
                      }
                    });
                  });
                  setMapLines([...mapLinesArr]);
                }
              })
              .catch((err) => {
                toast.error('해당경로는 길찾기를 제공하지 않습니다.');
              });
          });
      } else {
        const promises: Promise<any>[] = [];
        GetLineDataKakao(se[0], se[1], kakaolinePath)
          .then((result) => {
            if (result.status === 200 && result.data.status === 'SUCCESS') {
              result.data.data.forEach((ele: any) => {
                ele.vertexes.forEach((vertex: any, index: number) => {
                  if (index % 2 === 0) {
                    const latLng = new window.kakao.maps.LatLng(
                      ele.vertexes[index + 1],
                      ele.vertexes[index],
                    );

                    if (previousVertex) {
                      mapLinesArr.push(previousVertex);
                    }

                    mapLinesArr.push(latLng);

                    previousVertex = latLng;
                  }
                });
              });
              setMapLines([...mapLinesArr]);
            }
          })
          .catch((err) => {
            toast.error('해당경로는 길찾기를 제공하지 않습니다.');
          });

        Promise.all(promises).then(() => {
          // console.log(mapLinesArr);
          setMapLines([...mapLinesArr]);
        });
      }
    }
  }, [linePath]);

  useEffect(() => {
    if (dateDetail.length < route.length) {
      let newDate: CourseDayReqDto = {
        dayNumber: route[route.length - 1],
        wayPointReqDtoList: [],
        attractionReqDtoList: [],
      };
      setDateDetail((pre) => [...pre, newDate]);
    }
  }, [route]);

  useEffect(() => {
    if (wayPoints.length >= 2) {
      setColorValue(colors.main);

      let startlat = wayPoints[wayPoints.length - 2].lat;
      let startlon = wayPoints[wayPoints.length - 2].lon;
      let endlat = wayPoints[wayPoints.length - 1].lat;
      let endlon = wayPoints[wayPoints.length - 1].lon;

      GetDistance(startlat, startlon, endlat, endlon)
        .then((res) => {
          if (res.status === 200 && res.data.status === 'SUCCESS') {
            let dist: number = Number(
              (Number(res.data.data[0].distance) / 1000).toFixed(1),
            );
            let cal = (3.5 * 70 * (dist / 4.0)).toFixed(1);
            let durationInHours = dist / 4.0; // 소요 시간 (시간 단위)
            // console.log(durationInHours);
            // 시간과 분으로 변환
            let durationHours = Math.floor(durationInHours); // 시간
            let durationMinutes = Math.round(
              (durationInHours - durationHours) * 60,
            ); // 분

            let curWay = [...wayPoints];
            curWay[curWay.length - 1].distance = `${dist}km`;
            curWay[curWay.length - 1].calorie = `${cal}`;
            curWay[curWay.length - 1].duration =
              `${durationHours}시간${durationMinutes}분`;

            curWay.map((ele: WayPointReqDto, idx: number) => {
              if (idx === 0) {
                ele.type = '출발지';
              } else if (idx === curWay.length - 1) {
                ele.type = '도착지';
              } else {
                ele.type = '경유지';
              }
            });
            setWayPoints(curWay);
          }
        })
        .catch((err) => {});

      let route: AddRouteProps = {
        courseName: data.routeTitle,
        content: data.routeExplane,
        openState: data.isOpen,
        writeState: false,
        courseTypeList: data.typeChecked,
        courseDayReqDtoList: dateDetail,
        multipartFile: data.imgSrc,
      };

      setAddRoute(route);
    }
  }, [dateDetail]);

  useEffect(() => {
    dateDetail.map((ele: CourseDayReqDto) => {
      if (ele.dayNumber === selectedDay) {
        setWayPoints(ele.wayPointReqDtoList);
        setAttractions(ele.attractionReqDtoList);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    wayPoints.map((ele, idx) => {
      if (idx === 0) {
        ele.type = '출발지';
      } else if (idx === wayPoints.length - 1) {
        ele.type = '도착지';
      } else {
        ele.type = '경유지';
      }
    });
    // let newDateDetail: CourseDayReqDto[] = [...dateDetail];

    // setDateDetail(newDateDetail);
  }, [wayPoints]);

  const deleteDateDetail = (day: number) => {
    let newDetail: CourseDayReqDto[] = [];
    dateDetail.map((ele) => {
      if (ele.dayNumber !== day) {
        newDetail.push(ele);
      }
    });
    setDateDetail(newDetail);
  };

  const deleteWayHandler = (data: WayPointReqDto) => {
    let arr: WayPointReqDto[] = [];

    wayPoints.map((ele) => {
      if (ele.pointNumber !== data.pointNumber) {
        ele.pointNumber = String(arr.length + 1);
        arr.push(ele);
      }
    });
    if (arr.length > 0) {
      arr[0].type = '출발지';
    }

    if (arr.length > 1) {
      arr[arr.length - 1].type = '도착지';
    }

    setWayPoints(() => {
      const updatedWayPoints = arr;

      let newDateDetail: CourseDayReqDto[] = [...dateDetail];
      newDateDetail.map((ele: CourseDayReqDto) => {
        if (ele.dayNumber === selectedDay) {
          ele.wayPointReqDtoList = updatedWayPoints;
        }
      });
      setDateDetail(newDateDetail);
      return updatedWayPoints;
    });
  };

  const deleteAttractionHandler = (data: AttractionsAddCardProps) => {
    let arr: AttractionReqDto[] = [];

    attractions.map((ele) => {
      if (ele.name !== data.name) {
        arr.push(ele);
      }
    });

    setAttractions(() => {
      const updatedAttractions = arr;

      let newDateDetail: CourseDayReqDto[] = [...dateDetail];
      newDateDetail.map((ele: CourseDayReqDto) => {
        if (ele.dayNumber === selectedDay) {
          ele.attractionReqDtoList = updatedAttractions;
        }
      });
      setDateDetail(newDateDetail);
      return updatedAttractions;
    });
  };

  return searchOpen ? (
    <SearchPlacePage
      setAttractionsCard={setAttractionsCard}
      attractionsCard={attractionsCard}
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
        depart={
          wayPoints.length >= 2
            ? cutAddress(wayPoints[wayPoints.length - 1].address).includes(
                '특별',
              )
              ? cutAddress(wayPoints[wayPoints.length - 1].address).split(
                  '특별',
                )[0]
              : cutAddress(wayPoints[wayPoints.length - 1].address)
            : ''
        }
        arrive={
          wayPoints.length >= 2
            ? cutAddress(wayPoints[wayPoints.length - 1].address).includes(
                '특별',
              )
              ? cutAddress(wayPoints[wayPoints.length - 1].address).split(
                  '특별',
                )[0]
              : cutAddress(wayPoints[wayPoints.length - 1].address)
            : ''
        }
        clickBack={() => {
          navigate(-1);
        }}
        back={true}
        $isGrey
      />
      <R.MainContainer>
        <R.OverFlow>
          <R.DayContainer>
            <R.DayOverFlow>
              {route.map((ele) => (
                <R.DayCard
                  selected={selectedDay === ele}
                  onClick={() => {
                    setSelectedDay(ele);
                  }}
                  key={ele}
                >
                  {`Day ${ele}`}
                  <R.DayDeleteBox
                    onClick={(e) => {
                      e.stopPropagation();
                      if (route.length >= 2) {
                        let newD = [...route];
                        let d: number[] = [];
                        newD.map((el) => {
                          if (el !== ele) {
                            d.push(el);
                          }
                        });
                        deleteDateDetail(ele);
                        setRoute(d);
                      }
                    }}
                  >
                    X
                  </R.DayDeleteBox>
                </R.DayCard>
              ))}
              <R.DatAddCard
                onClick={() => {
                  setRoute((pre) => [...pre, route[route.length - 1] + 1]);
                  setDay(route[route.length - 1] + 1);
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
                <Map
                  latitude={curLatitude}
                  longitude={curLongtitude}
                  infoBtn
                  marker={marker}
                  linePath={mapLines}
                  attrationmarker={attmarker}
                />
              ) : null}
            </R.MapBox>
            <R.PlaceContainer>
              <R.PlaceBox>
                <R.PlaceTypeBox>경유지</R.PlaceTypeBox>
                <R.DetailWayOverflow>
                  {wayPoints.map((ele: WayPointReqDto, idx: number) => (
                    <RoutePlaceCard
                      key={idx}
                      routeAddress={ele.address}
                      routeId={idx}
                      routeName={ele.name}
                      routeType={ele.type}
                      latitude={ele.lat}
                      longitude={ele.lon}
                      routePoint={`${ele.pointNumber}`}
                      isAdd
                      deleteHandler={() => {
                        deleteWayHandler(ele);
                      }}
                    />
                  ))}
                </R.DetailWayOverflow>
              </R.PlaceBox>
              <R.AttractionsBox>
                <R.AttrantiosTypeBox>관광지</R.AttrantiosTypeBox>
                <R.AttractionsOverflow>
                  {attractionsCard.length > 0 &&
                    attractionsCard.map((ele: AttractionsAddCardProps) => (
                      <R.AttractionCard img={ele.img}>
                        <R.AttractionCardTitle>
                          {ele.keyword}
                        </R.AttractionCardTitle>
                        <R.AttractionCardDetail>
                          <Icon name="IconFlag" size={20} />
                          <R.AttractionCardDetailText>
                            {ele.name}
                          </R.AttractionCardDetailText>
                        </R.AttractionCardDetail>
                        <R.AttractionDeleteBox
                          onClick={() => {
                            deleteAttractionHandler(ele);
                          }}
                        >
                          <Icon name="IconRetouchDelete" size={15} />
                        </R.AttractionDeleteBox>
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
            fc="ffffff"
            bc={colorValue}
            radius={0.7}
            fontSize={1.6}
            children="경로완성"
            color="#ffffff"
            onClick={() => {
              if (
                addRoute.courseDayReqDtoList.length > 0 &&
                addRoute.courseDayReqDtoList[0].wayPointReqDtoList.length > 0
              ) {
                // console.log(addRoute);
                AddRoute(addRoute)
                  .then((res) => {
                    if (res.status === 200) {
                      navigate('/route/add/complete');
                    }
                  })
                  .catch((err) => {
                    toast.error('경로 생성에 실패했습니다.');
                  });
              }
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  );
}

export default RouteAddDetailPage;
