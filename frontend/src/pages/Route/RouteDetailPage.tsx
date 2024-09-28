import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  getRouteDayAttraction,
  getRouteDayDetail,
  getRouteDetail,
  getRouteReview,
} from '@/api/route/GET';
import {
  AttractionsProps,
  DaysOfRouteProps,
  LineStartEndProps,
  MakerDataProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
} from '@/models/route';
import Header from '@/components/common/Header/Header';
import Button from '@/components/common/Button/Button';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import ReviewModal from '@/components/Style/Route/ReviewModal';
import { GetLineData, GetLineDataKakao } from '@/api/route/POST';
import { RouteDelete } from '@/api/route/Delete';
import { toast } from 'react-toastify';

import defaultImg from '@/assets/img/mountain.jpg';
import { GetUser } from '@/api/mypage/GET';
import useQueryHandling from '@/hooks/global/useQueryHandling';
import { setDefaultImg } from '@/utils/Image';

function RouteDetailPage() {
  const { routeid } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { startDate, recruitmentPeriod, type } = location.state || {};

  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [se, setSe] = useState<LineStartEndProps[]>([]);
  const [marker, setMarker] = useState<MakerDataProps[]>([]);
  const [attmarker, setAttMarker] = useState<LineStartEndProps[]>([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [retouch, setRetouch] = useState<boolean>(false);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [memberName, setMemberName] = useState<string>('');
  const [profileImg, setProfileImg] = useState<string>('');
  const [reviewSet, setReviewSet] = useState<string>('생성');
  const [beforeReview, setBeforeReview] = useState<string>('');
  const [beforeRating, setBeforeRating] = useState<number>(0);
  const [reviewId, setReviewId] = useState<number>(0);
  const [noVertexes, setNoVertexes] = useState<boolean>(false);
  const [kakaolinePath, setKakaoLinePath] = useState<MapLinePathProps[]>([]);
  /** 바텀 sheet */
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false); // 경로설정 BottomSheet 열림 상태
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false); // 경로정렬 BottomSheet 열림 상태

  useEffect(() => {
    if (dayData.length === 0) {
      getRouteDetail(routeid as string)
        .then((result) => {
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
            setProfileImg(result.data.data.profilePicture);
            setMemberName(result.data.data.nickname);
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

          setLoading(true);
        })
        .catch((err) => {});
    } else {
      if (!isOpenSetting) {
        getRouteDetail(routeid as string)
          .then((result) => {
            if (result.data.status !== 'ERROR' && result.status === 200) {
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
            }

            setLoading(true);
          })
          .catch((err) => {});
      }
    }
  }, [isOpenSetting]);

  useEffect(() => {
    setSe([]);
    setMarker([]);
    setAttMarker([]);
    getRouteDayDetail(routeid as string, selectedDay).then((result) => {
      if (result.status === 200) {
        let arr: DaysOfRouteProps[] = [];
        let lines: MapLinePathProps[] = [];
        let kakaose: LineStartEndProps[] = [];
        let kakaoData: MapLinePathProps[] = [];
        // console.log(result);
        result.data.data.wayPoints.sort(
          (a: any, b: any) => a.pointNumber - b.pointNumber,
        );
        result.data.data.wayPoints.map((ele: any, idx: number) => {
          let data: DaysOfRouteProps = {
            routeName: ele.name,
            routeAddress: ele.address,
            routeType: ele.type,
            routeId: ele.waypointId,
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
          if (idx === 0 || idx === result.data.data.wayPoints.length - 1) {
            let kse: LineStartEndProps = {
              x: ele.lat,
              y: ele.lon,
            };
            kakaose.push(kse);
          } else {
            kakaoData.push(line);
          }
          lines.push(line);
          if (ele.vertexes !== null) {
            if (ele.vertexes.length > 0) {
              const ml: any[] = [];
              ele.vertexes.forEach((vertex: any, index: number) => {
                // console.log(vertex);
                if (index % 2 === 0) {
                  ml.push(
                    new window.kakao.maps.LatLng(
                      ele.vertexes[index + 1],
                      ele.vertexes[index],
                    ),
                  );
                }
              });

              setMapLines([...ml]);
              // setNoVertexes(false);
            } else {
              setNoVertexes(true);
            }
          } else {
            setNoVertexes(true);
          }

          let markerData: MakerDataProps = {
            x: ele.lat,
            y: ele.lon,
            distance: ele.distance,
            duration: ele.duration,
            name: ele.name,
            calorie: ele.calorie,
          };
          setMarker((pre) => [...pre, markerData]);
        });
        arr.sort((a: any, b: any) => a.routePoint - b.routePoint);
        setDayOfRoute(arr);
        setLinePath(lines);

        setLatitude(arr[0].latitude);
        setLongitude(arr[0].longitude);
      }
    });

    getRouteDayAttraction(routeid as string, selectedDay).then((res) => {
      if (res.status === 200 && res.data.status === 'SUCCESS') {
        let attArr: AttractionsProps[] = [];

        res.data.data.map((ele: any) => {
          let attData: AttractionsProps = {
            name: ele.name,
            type: ele.type,
            attractionId: ele.attractionId,
            address: ele.address,
            latitude: ele.lon,
            longitude: ele.lat,
            img: ele.img,
          };
          attArr.push(attData);

          let markerData: LineStartEndProps = {
            x: ele.lon,
            y: ele.lat,
          };
          setAttMarker((pre) => [...pre, markerData]);
        });
        setAttractions(attArr);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    if (noVertexes) {
      // console.log(linePath);
      if (linePath.length > 0) {
        // console.log('oo');
        const mapLines: any[] = [];
        if (linePath.length <= 5) {
          GetLineData(linePath)
            .then((res) => {
              if (res.status === 200 && res.data.status === 'SUCCESS') {
                res.data.data.forEach((ele: any) => {
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
                  if (
                    result.status === 200 &&
                    result.data.status === 'SUCCESS'
                  ) {
                    result.data.data.forEach((ele: any, idx: number) => {
                      // wayPoints.map((el: WayPointReqDto, i: number) => {
                      //   // eslint-disable-next-line no-self-assign
                      //   if (idx === i) {
                      //     el.vertexes = ele.vertexes;
                      //   }
                      // });

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
                      res.data.data.forEach((ele: any) => {
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
                            // wayPoints.map((el: WayPointReqDto, i: number) => {
                            //   // eslint-disable-next-line no-self-assign
                            //   if (idx === i) {
                            //     el.vertexes = ele.vertexes;
                            //   }
                            // });

                            ele.vertexes.forEach(
                              (vertex: any, index: number) => {
                                if (index % 2 === 0) {
                                  mapLines.push(
                                    new window.kakao.maps.LatLng(
                                      ele.vertexes[index + 1],
                                      ele.vertexes[index],
                                    ),
                                  );
                                }
                              },
                            );
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
    }
  }, [linePath]);

  useEffect(() => {
    getRouteReview(routeid as string).then((result) => {
      let arr: RouteReviewProps[] = [];
      if (result.data.status !== 'ERROR' && result.status === 200) {
        result.data.data.map((ele: any) => {
          let data: RouteReviewProps = {
            memberId: ele.memberId,
            routeId: ele.courseId,
            content: ele.content,
            score: ele.score,
            writeDate: ele.writeDate,
            like: ele.like,
            memberNickname: ele.memberNickname,
            reviewId: ele.reviewId,
          };
          arr.push(data);
        });

        setReviews(arr);
      }
      setReviewLoading(true);
    });
  }, [isModalOpen]);

  const deleteHandler = () => {
    RouteDelete(routeid as string)
      .then((res) => {
        if (res.data.status === 'SUCCESS') {
          navigate('/route/list');
          toast.done('경로 삭제에 성공했습니다.');
        } else {
          setIsOpenSetting(false);
          toast.error('경로 삭제 권한이 없습니다.');
        }
      })
      .catch((err) => {
        toast.error('경로 삭제에 실패했습니다.');
      });
  };

  const { data: userInfo } = useQueryHandling(
    'getUser',
    GetUser,
    //   {
    //   onSuccess: (res) => {
    //     // console.log('res ::', res.data);
    //     if (res.status === STATUS.success) {
    //     } else if (res.status === STATUS.error) {
    //       toast.error(res.message);
    //     }
    //   },
    //   onError: (error: AxiosError) => {
    //     // toast.error(error.message);
    //   },
    // }
  );

  const renderBottomSheet = () => {
    if (isOpenSetting) {
      return (
        <BottomSheet
          id={Number(routeid)}
          selected={reviewType}
          setSelected={setReviewType}
          route={'경로설정'}
          bsType={'경로설정'}
          bsTypeText={'설정'}
          setIsOpen={setIsOpenSetting}
          onEdit={() => {
            navigate(`/route/detail/retouch/${routeid}`);
          }}
          onDelete={deleteHandler}
          writeState={routeData.writeState}
          openState={routeData.openState}
          isWrite={memberName === userInfo.data.nickname}
        />
      );
    }
    if (isOpenSorting) {
      return (
        <BottomSheet
          id={Number(routeid)}
          selected={reviewType}
          setSelected={setReviewType}
          route={'경로정렬'}
          bsType={'경로정렬'}
          bsTypeText={'정렬'}
          setIsOpen={setIsOpenSorting}
        />
      );
    }
    return null;
  };

  const reviewCardHandler = (ele: RouteReviewProps) => {
    if (userInfo.data.nickname === ele.memberNickname) {
      setReviewSet('수정');
      setBeforeRating(ele.score);
      setBeforeReview(ele.content);
      setIsModalOpen(true);
      setReviewId(ele.reviewId);
    } else {
      toast.error('리뷰 삭제, 수정 권한이 없습니다.');
    }
  };

  return loading ? (
    <R.Container>
      <Header
        purpose="route-detail"
        back={true}
        clickBack={() => {
          navigate(-1);
        }}
        clickOption={() => {
          setIsOpen(true);
          setIsOpenSetting(!isOpenSetting);
        }}
      />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox>
              {/* 디퐅트 이미지 사용예시 */}
              {loading && <img src={setDefaultImg(routeData.img || null)} />}
            </R.ImgBox>
            <R.UserContainer>
              <R.UserImgBox>
                {profileImg === '' ? (
                  <Icon name="IconUserBasicImg" size={42} />
                ) : (
                  <img src={profileImg} />
                )}
              </R.UserImgBox>
              <R.UserName>{memberName}</R.UserName>
            </R.UserContainer>
            <R.RouteNameInfo>
              <R.RouteNameInfoContainer>
                <R.RouteName>{routeData.routeName}</R.RouteName>
                <R.RouteInfo>{routeData.routeContent}</R.RouteInfo>
              </R.RouteNameInfoContainer>
              <R.RouteTypeContainer>
                {routeType.map((ele: string) => (
                  <R.RouteType $isLong={ele.length > 3} key={ele}>
                    {ele}
                  </R.RouteType>
                ))}
              </R.RouteTypeContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGrenStar" size={13} />
                    {Math.floor(routeData.routeScore)}
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
              <R.ContentBox
                selected={selected === 'review'}
                onClick={() => {
                  setSelected('review');
                }}
              >
                리뷰
              </R.ContentBox>
            </R.ContentSelecContainer>
          </R.RouteInfoContainer>
          <R.RouteDetailInfoContainer>
            <RouteDetailInfo
              marker={marker}
              deleteHandler={(name: string) => {}}
              setSelectedIdx={setSelectedIdx}
              reviews={reviews}
              setDayOfRoute={setDayOfRoute}
              dayOfRoute={dayOfRoute}
              linePath={mapLines}
              selected={selected}
              selectedDay={selectedDay}
              latitude={latitude}
              longitude={longitude}
              dayData={dayData}
              attractions={attractions}
              setLoading={setLoading}
              setSelectedDay={setSelectedDay}
              setIsOpen={setIsOpenSorting}
              setBsType={setBsType}
              reviewType={reviewType}
              attmarker={attmarker}
              reviewClickEven={reviewCardHandler}
            />
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      <R.BottomContainer>
        <R.WriteTextBox
          onClick={() => {
            setReviewSet('생성');
            setIsModalOpen(true);
          }}
        >
          리뷰작성
        </R.WriteTextBox>
        <R.ButtonBox>
          <Button
            width={65}
            height={6}
            fc="ffffff"
            bc="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="일정 생성"
            color="#ffffff"
            onClick={() => {
              if (type === 'schedule') {
                navigate('/schedule/addSchedule', {
                  state: {
                    id: routeid,
                    latitude: latitude,
                    longitude: longitude,
                    ready: true,
                    start: routeData.start,
                    end: routeData.end,
                    totalDays: dayData.length,
                  },
                });
              }
              if (type === 'meet') {
                navigate('/meet/addMain/addSchedule', {
                  state: {
                    courseId: routeid,
                    startDate: startDate,
                    recruitmentPeriod: recruitmentPeriod,
                    lat: latitude,
                    lon: longitude,
                    ready: true,
                    start: routeData.start,
                    end: routeData.end,
                    totalDays: dayData.length,
                  },
                });
              }
            }}
          />
        </R.ButtonBox>
      </R.BottomContainer>
      {renderBottomSheet()}
      {isModalOpen && (
        <ReviewModal
          routeid={routeid as string}
          isVisible={isModalOpen}
          setIsOpen={setIsModalOpen}
          type={reviewSet}
          beforeRating={beforeRating}
          beforeReview={beforeReview}
          setBeforeRating={setBeforeRating}
          setBeforeReview={setBeforeReview}
          reviewId={reviewId}
          setReviewId={setReviewId}
        />
      )}
    </R.Container>
  ) : null;
}

export default RouteDetailPage;
