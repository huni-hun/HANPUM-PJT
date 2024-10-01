import BottomSheet from '@/components/Style/Route/BottomSheet';
import ReviewModal from '@/components/Style/Route/ReviewModal';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import Button from '@/components/common/Button/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  RetouchRouteProps,
  AttractionReqDto,
  AttractionsAddCardProps,
  AttractionsProps,
  CourseDayReqDto,
  DaysOfRouteProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
  WayPointReqDto,
  LineStartEndProps,
  MapLinePathProps,
} from '@/models/route';
import {
  getRouteDayAttraction,
  getRouteDayDetail,
  getRouteDetail,
} from '@/api/route/GET';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import Header from '@/components/common/Header/Header';
import Icon from '@/components/common/Icon/Icon';
import SearchPlacePage from './SearchPlacePage';
import { GetDistance, GetLineData, GetLineDataKakao } from '@/api/route/POST';
import { RetouchRoute } from '@/api/route/PUT';
import { toast } from 'react-toastify';

function RouteDetailRetouchPage() {
  const { routeid } = useParams();
  const navigate = useNavigate();

  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [open, setIsopen] = useState<boolean>(false);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [addRoute, setAddRoute] = useState<RetouchRouteProps>(null!);
  const [dateDetail, setDateDetail] = useState<CourseDayReqDto[]>([]);
  const [wayPoints, setWayPoints] = useState<WayPointReqDto[]>([]);
  const [attractionsr, setAttractionsr] = useState<AttractionReqDto[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [loadAll, setLoadAll] = useState<boolean>(false);
  const [kakaolinePath, setKakaoLinePath] = useState<MapLinePathProps[]>([]);
  const [attractionsCard, setAttractionsCard] = useState<
    AttractionsAddCardProps[]
  >([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [pointType, setPointType] = useState<string>('wp');
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [se, setSe] = useState<LineStartEndProps[]>([]);
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  useEffect(() => {
    if (dayData.length === 0) {
      getRouteDetail(routeid as string).then((result) => {
        if (result.data.status !== 'ERROR' && result.status === 200) {
          let num = 0;
          let rd: RouteDetailProps = {
            routeName: result.data.data.course.courseName,
            routeContent: result.data.data.course.content,
            writeDate: result.data.data.course.writeDate,
            routeComment: result.data.data.course.commentCnt,
            routeScore: result.data.data.course.scoreAvg,
            start: result.data.data.course.startPoint,
            end: result.data.data.course.endPoint,
            img: result.data.data.course.backgroundImg,
            writeState: result.data.data.course.writeState,
            openState: result.data.data.course.openState,
          };
          setRouteData(rd);
          result.data.data.courseDays.map((ele: any) => {
            let data: RouteDetailDayProps = {
              dayNum: ele.dayNumber,
              totalDistance: ele.total_distance,
              totalCalorie: ele.total_calorie,
              totalDuration: ele.total_duration,
            };
            setDayData((pre) => [...pre, data]);
            num += ele.total_distance;
          });
          let type: string[] = [];
          result.data.data.course.courseTypes.map((ele: string) => {
            type.push(ele);
          });
          setRouteType(type);
          setTotalDistance(num);
        }

        let courselist: CourseDayReqDto[] = [];

        result.data.data.courseDays.map((ele: any) => {
          let course: CourseDayReqDto = {
            dayNumber: ele.dayNumber,
            wayPointReqDtoList: [],
            attractionReqDtoList: [],
          };

          courselist.push(course);
        });
        setDateDetail(courselist);

        let route: RetouchRouteProps = {
          courseName: result.data.data.course.courseName,
          content: result.data.data.course.content,
          openState: result.data.data.course.openState,
          writeState: result.data.data.course.writeState,
          courseTypeList: result.data.data.course.courseTypes,
          multipartFile: result.data.data.course.backgroundImg,
          courseDayReqDtoList: courselist,
          courseId: Number(routeid),
        };
        setAddRoute(route);
        setLoading(true);
      });
    }
  }, []);

  useEffect(() => {
    let copyDetail: CourseDayReqDto[] = [...dateDetail];

    if (loading) {
      dateDetail.map((ele: CourseDayReqDto, idx: number) => {
        if (ele.wayPointReqDtoList.length < 1) {
          getRouteDayDetail(routeid as string, ele.dayNumber).then((result) => {
            if (result.status === 200) {
              let wayPoints: WayPointReqDto[] = [];
              let arr: DaysOfRouteProps[] = [];
              result.data.data.wayPoints.map((ele: any) => {
                let waypoint: WayPointReqDto = {
                  type: ele.type,
                  name: ele.name,
                  address: ele.address,
                  lat: ele.lat,
                  lon: ele.lon,
                  pointNumber: ele.pointNumber,
                  distance: ele.distance,
                  duration: ele.duration,
                  calorie: ele.calorie,
                  vertexes: ele.vertexes,
                };
                wayPoints.push(waypoint);

                let data: DaysOfRouteProps = {
                  routeName: ele.name,
                  routeAddress: ele.address,
                  routeType: ele.type,
                  routeId: idx,
                  routePoint: ele.pointNumber,
                  latitude: ele.lat,
                  longitude: ele.lon,
                };
                arr.push(data);
              });
              arr.sort(
                (a: DaysOfRouteProps, b: DaysOfRouteProps) =>
                  Number(a.routePoint) - Number(b.routePoint),
              );
              setDayOfRoute(arr);
              copyDetail[idx].wayPointReqDtoList = wayPoints;
              setSelectedDay(idx + 1);
              // wayPoints가 존재할 때에만 latitude와 longitude를 설정
            }
          });
        }
        if (ele.attractionReqDtoList.length < 1) {
          let attArr: AttractionsProps[] = [];
          let newAttR: AttractionReqDto[] = [];
          getRouteDayAttraction(routeid as string, ele.dayNumber).then(
            (result) => {
              result.data.data.map((ele: any) => {
                let attData: AttractionsProps = {
                  name: ele.name,
                  type: ele.type,
                  attractionId: ele.attractionId,
                  address: ele.address,
                  latitude: ele.lat,
                  longitude: ele.lon,
                  img: ele.img,
                };

                let attraction: AttractionReqDto = {
                  address: ele.address,
                  lat: ele.lat,
                  lon: ele.lon,
                  name: ele.name,
                  type: ele.type,
                  image: ele.img,
                };
                newAttR.push(attraction);
                attArr.push(attData);
              });
            },
          );
          setAttractionsr(newAttR);
          setAttractions(attArr);
          copyDetail[idx].attractionReqDtoList = newAttR;
        }
      });
      setDateDetail(copyDetail);
      setIsopen(true);
    }
  }, [loading]);

  useEffect(() => {
    let arr: DaysOfRouteProps[] = [];
    if (dateDetail.length > 0) {
      dateDetail[selectedDay - 1].wayPointReqDtoList.sort(
        (a: any, b: any) => a.pointNumber - b.pointNumber,
      );
      dateDetail[selectedDay - 1].wayPointReqDtoList.map(
        (ele: WayPointReqDto, idx: number) => {
          let data: DaysOfRouteProps = {
            routeName: ele.name,
            routeAddress: ele.address,
            routeType: ele.type,
            routeId: idx,
            routePoint: ele.pointNumber,
            latitude: ele.lat,
            longitude: ele.lon,
          };

          arr.push(data);
        },
      );
      setWayPoints(dateDetail[selectedDay - 1].wayPointReqDtoList);
      if (arr.length > 0) {
        setLatitude(arr[0].latitude);
        setLongitude(arr[0].longitude);
      }
      let attArr: AttractionsProps[] = [];
      dateDetail[selectedDay - 1].attractionReqDtoList.map(
        (ele: AttractionReqDto, idx: number) => {
          let attData: AttractionsProps = {
            name: ele.name,
            type: ele.type,
            attractionId: idx + 1,
            address: ele.address,
            latitude: ele.lat,
            longitude: ele.lon,
            img: ele.image,
          };

          attArr.push(attData);
        },
      );

      setAttractions(attArr);
    }
    setDayOfRoute(arr);
  }, [selectedDay]);

  useEffect(() => {
    if (selectedIdx > 0) {
      let newWay: DaysOfRouteProps[] = [];
      dayOfRoute.map((ele: DaysOfRouteProps, idx: number) => {
        if (selectedIdx !== idx) {
          let data = { ...ele };
          data.routePoint = String(newWay.length + 1);
          newWay.push(data);
        }
      });
      setDayOfRoute(newWay);
    }
  }, [selectedIdx]);

  useEffect(() => {
    setSe([]);
    setMarker([]);
    let arr: DaysOfRouteProps[] = [];
    let lines: MapLinePathProps[] = [];
    let kakaose: LineStartEndProps[] = [];
    let kakaoData: MapLinePathProps[] = [];
    if (dateDetail.length > 0) {
      if (dateDetail[selectedDay - 1].wayPointReqDtoList.length > 0) {
        wayPoints.sort((a: any, b: any) => a.routePoint - b.routePoint);
        wayPoints.map((ele: WayPointReqDto, idx: number) => {
          // console.log(ele);
          let data: DaysOfRouteProps = {
            routeName: ele.name,
            routeAddress: ele.address,
            routeType: ele.type,
            routeId: idx,
            routePoint: ele.pointNumber,
            latitude: ele.lat,
            longitude: ele.lon,
          };
          arr.push(data);

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

          let markerData: LineStartEndProps = {
            x: ele.lat,
            y: ele.lon,
          };
          setMarker((pre) => [...pre, markerData]);
        });
        setLinePath(lines);
        setSe(kakaose);
        setKakaoLinePath(kakaoData);
        setWayPoints(dateDetail[selectedDay - 1].wayPointReqDtoList);
      }
      setLoadAll(true);
    }

    setDayOfRoute(arr);
  }, [wayPoints]);

  useEffect(() => {
    if (linePath.length > 1) {
      const mapLines: any[] = [];
      if (linePath.length <= 5) {
        // console.log(linePath);
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
                    mapLines.push(
                      new window.kakao.maps.LatLng(
                        ele.vertexes[index + 1],
                        ele.vertexes[index],
                      ),
                    );
                  }
                });
              });
              setMapLines([...mapLines]); // 복사본으로 상태 업데이트
            }
          })
          .catch((err) => {
            GetLineDataKakao(se[0], se[1], kakaolinePath)
              .then((result) => {
                if (result.status === 200 && result.data.status === 'SUCCESS') {
                  result.data.data.forEach((ele: any, idx: number) => {
                    wayPoints.map((el: WayPointReqDto, i: number) => {
                      // eslint-disable-next-line no-self-assign
                      if (idx === i) {
                        el.vertexes = ele.vertexes;
                      }
                    });

                    ele.vertexes.forEach((vertex: any, index: number) => {
                      if (index % 2 === 0) {
                        mapLines.push(
                          new window.kakao.maps.LatLng(
                            ele.vertexes[index + 1],
                            ele.vertexes[index],
                          ),
                        );
                      }
                    });
                  });
                  setMapLines([...mapLines]); // 복사본으로 상태 업데이트
                }
              })
              .catch((err) => {
                toast.error('해당경로는 길찾기를 제공하지 않습니다.');
              });
          });
      } else {
        let arr: MapLinePathProps[] = [];
        const promises: Promise<any>[] = []; // 비동기 작업을 저장할 배열

        linePath.forEach((ele: MapLinePathProps, idx: number) => {
          arr.push(ele);

          if (arr.length === 5 || idx === linePath.length - 1) {
            // 배열이 5개가 되었거나 마지막 요소일 때 GetLineData 호출
            promises.push(
              GetLineData(arr)
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
                          mapLines.push(
                            new window.kakao.maps.LatLng(
                              ele.vertexes[index + 1],
                              ele.vertexes[index],
                            ),
                          );
                        }
                      });
                    });
                  }
                })
                .catch((err) => {
                  GetLineDataKakao(se[0], se[1], kakaolinePath)
                    .then((result) => {
                      if (
                        result.status === 200 &&
                        result.data.status === 'SUCCESS'
                      ) {
                        result.data.data.forEach((ele: any, idx: number) => {
                          wayPoints.map((el: WayPointReqDto, i: number) => {
                            // eslint-disable-next-line no-self-assign
                            if (idx === i) {
                              el.vertexes = ele.vertexes;
                            }
                          });

                          ele.vertexes.forEach((vertex: any, index: number) => {
                            if (index % 2 === 0) {
                              mapLines.push(
                                new window.kakao.maps.LatLng(
                                  ele.vertexes[index + 1],
                                  ele.vertexes[index],
                                ),
                              );
                            }
                          });
                        });
                        setMapLines([...mapLines]); // 복사본으로 상태 업데이트
                      }
                    })
                    .catch((err) => {
                      toast.error('해당경로는 길찾기를 제공하지 않습니다.');
                    });
                }),
            );

            // 배열 초기화
            arr = [];
          }
        });

        // 모든 비동기 작업이 완료된 후에 setMapLines 호출
        Promise.all(promises).then(() => {
          setMapLines([...mapLines]);
        });
      }
    }
  }, [linePath]);

  const deleteAttracHandler = (i: string) => {
    let newAttacR: AttractionReqDto[] = [];
    attractionsr.map((ele: AttractionReqDto) => {
      if (i !== ele.name) {
        newAttacR.push(ele);
      }
    });

    setAttractionsr(newAttacR);
  };

  useEffect(() => {
    let attArr: AttractionsProps[] = [];
    if (attractionsr.length > 0) {
      attractionsr.map((ele: AttractionReqDto, idx: number) => {
        let attData: AttractionsProps = {
          name: ele.name,
          type: ele.type,
          attractionId: idx,
          address: ele.address,
          latitude: ele.lat,
          longitude: ele.lon,
          img: ele.image,
        };

        attArr.push(attData);
      });
    }
    setAttractions(attArr);
  }, [attractionsr]);

  useEffect(() => {
    if (wayPoints.length >= 2) {
      // console.log(wayPoints);
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
            let durationInHours = dist / 4.0;

            let durationHours = Math.floor(durationInHours); // 시간
            let durationMinutes = Math.round(
              (durationInHours - durationHours) * 60,
            );

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
        .catch((err) => {
          toast.info('거리를 가져오지 못 했습니다.');
        });

      let route: RetouchRouteProps = {
        courseId: Number(routeid),
        courseName: addRoute.courseName,
        content: addRoute.content,
        openState: addRoute.openState,
        writeState: false,
        courseTypeList: addRoute.courseTypeList,
        courseDayReqDtoList: dateDetail,
        multipartFile: addRoute.multipartFile,
      };

      setAddRoute(route);
    }
    if (dateDetail.length > 0) {
      setWayPoints(dateDetail[dateDetail.length - 1].wayPointReqDtoList);
    }
  }, [dateDetail]);

  useEffect(() => {
    if (dayOfRoute.length > 0) {
      setLatitude(dayOfRoute[0].latitude);
      setLongitude(dayOfRoute[0].longitude);
      dayOfRoute.sort(
        (a: DaysOfRouteProps, b: DaysOfRouteProps) =>
          Number(a.routePoint) - Number(b.routePoint),
      );
      setWayPoints(dateDetail[selectedDay - 1].wayPointReqDtoList);
    }
  }, [dayOfRoute]);

  const clickWayBtn = () => {
    setPointType('wp');
    setSearchOpen(true);
  };

  const clickAttryBtn = () => {
    setPointType('nwp');
    setSearchOpen(true);
  };

  const dayAddHandler = () => {
    let course: CourseDayReqDto = {
      dayNumber: dayData.length + 1,
      wayPointReqDtoList: [],
      attractionReqDtoList: [],
    };

    let data: RouteDetailDayProps = {
      dayNum: dayData.length + 1,
      totalDistance: '0',
      totalCalorie: '0',
      totalDuration: '0',
    };
    setDayData((pre) => [...pre, data]);
    setDateDetail((pre) => [...pre, course]);
  };

  const dayDeleteHandler = (selectNum: number) => {
    let courseArr: CourseDayReqDto[] = [];
    let detailArr: RouteDetailDayProps[] = [];

    dayData.map((ele) => {
      if (ele.dayNum !== selectNum) {
        let data: RouteDetailDayProps = {
          dayNum: detailArr.length + 1,
          totalDistance: ele.totalDistance,
          totalCalorie: ele.totalCalorie,
          totalDuration: ele.totalDuration,
        };

        detailArr.push(data);
      }
    });

    dateDetail.map((ele) => {
      if (ele.dayNumber !== selectNum) {
        let course: CourseDayReqDto = {
          dayNumber: courseArr.length + 1,
          wayPointReqDtoList: ele.wayPointReqDtoList,
          attractionReqDtoList: ele.attractionReqDtoList,
        };

        courseArr.push(course);
      }
    });
    setSelectedDay(detailArr[detailArr.length - 1].dayNum);
    setDayData(detailArr);
    setDateDetail(courseArr);
  };

  return searchOpen ? (
    <SearchPlacePage
      setAttractionsCard={setAttractionsCard}
      attractionsCard={attractionsCard}
      pointType={pointType}
      attractions={attractionsr}
      setAttractions={setAttractionsr}
      day={selectedDay}
      dateDetail={dateDetail}
      setDateDetail={setDateDetail}
      setSearchOpen={setSearchOpen}
      setWayPoints={setWayPoints}
      wayPoints={wayPoints}
    />
  ) : loading && open ? (
    <R.Container>
      <Header
        purpose="route-retouch"
        clickBack={() => {
          navigate(-1);
        }}
        clickOption={() => {
          RetouchRoute(addRoute)
            .then((ele) => {
              if (ele.status === 200) {
                navigate(-1);
              }
            })
            .catch((err) => {});
        }}
      />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox>
              <img src={routeData.img} />
            </R.ImgBox>
            <R.UserContainer>
              <R.UserImgBox>
                <Icon name="IconUserBasicImg" size={42} />
              </R.UserImgBox>
              <R.UserName>작성자</R.UserName>
            </R.UserContainer>
            <R.RouteNameInfo>
              <R.RouteNameInfoContainer>
                <R.RouteName>{routeData.routeName}</R.RouteName>
                <R.RouteInfo>{routeData.routeContent}</R.RouteInfo>
              </R.RouteNameInfoContainer>
              <R.RouteTypeContainer>
                {routeType.map((ele: string, idx: number) => (
                  <R.RouteType key={idx} $isLong={ele.length > 3}>
                    {ele}
                  </R.RouteType>
                ))}
              </R.RouteTypeContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGrenStar" size={13} />
                    {Math.round(routeData.routeScore)}
                  </R.IconBox>
                  {`(${routeData.routeComment})`}
                </R.IconContainer>
                <R.WriteDateBox>{routeData.writeDate}</R.WriteDateBox>
              </R.RouteReviewContainer>
            </R.RouteNameInfo>
            <R.RouteDateBox>
              <R.RouteDateTilteBox>경로 일정 정보</R.RouteDateTilteBox>
              <R.RouteDateInfoBox>
                <R.RoutePlaceInfoBox>
                  <R.PointText>출발지</R.PointText>
                  <R.PlaceText>{routeData.start}</R.PlaceText>
                </R.RoutePlaceInfoBox>
                <R.RoutePlaceInfoBox>
                  <R.PointText style={{ marginLeft: '1.5rem' }}>
                    도착지
                  </R.PointText>
                  <R.PlaceText style={{ marginLeft: '1.5rem' }}>
                    {routeData.end}
                  </R.PlaceText>
                </R.RoutePlaceInfoBox>
                <R.RouteIconBox>
                  <R.ArrowBox>
                    <Icon name="IconArrowBlack" size={10} />
                  </R.ArrowBox>
                  <R.DistanceNumBox>
                    {Math.round(totalDistance)}km
                  </R.DistanceNumBox>
                </R.RouteIconBox>
              </R.RouteDateInfoBox>
              <R.RouteDateTextBox>
                총 일정기간
                <R.DateBoldText>{`${dayData.length - 1}박 ${dayData.length}일`}</R.DateBoldText>
              </R.RouteDateTextBox>
            </R.RouteDateBox>
            <R.ContentSelecContainer>
              <R.ContentBox
                selected={selected === 'course'}
                onClick={() => {
                  setSelected('course');
                }}
              >
                코스
              </R.ContentBox>
              <R.ContentBox
                selected={selected === 'information'}
                onClick={() => {
                  setSelected('information');
                }}
              >
                관광지
              </R.ContentBox>
            </R.ContentSelecContainer>
          </R.RouteInfoContainer>
          <R.RouteDetailInfoContainer>
            {loading && (
              <RouteDetailInfo
                marker={marker}
                deleteHandler={deleteAttracHandler}
                setSelectedIdx={setSelectedIdx}
                dayOfRoute={dayOfRoute}
                reviews={reviews}
                setDayOfRoute={setDayOfRoute}
                setIsOpen={setIsopen}
                linePath={mapLines}
                selected={selected}
                selectedDay={selectedDay}
                latitude={latitude}
                longitude={longitude}
                dayData={dayData}
                attractions={attractions}
                setLoading={setLoading}
                setSelectedDay={setSelectedDay}
                setBsType={setBsType}
                reviewType={reviewType}
                clickAttryBtn={clickAttryBtn}
                clickWayBtn={clickWayBtn}
                retouchDayHandler={dayAddHandler}
                retouchDayDeHandler={dayDeleteHandler}
              />
            )}
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
    </R.Container>
  ) : null;
}

export default RouteDetailRetouchPage;
