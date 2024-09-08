import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { GetLineData } from '@/api/route/POST';
import { RouteDelete } from '@/api/route/Delete';
import { toast } from 'react-toastify';

import defaultImg from '@/assets/img/mountain.jpg';
import { GetUser } from '@/api/mypage/GET';

function RouteDetailPage() {
  const { routeid } = useParams();
  const navigate = useNavigate();

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
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [retouch, setRetouch] = useState<boolean>(false);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [memberId, setMemberId] = useState<number>(0);
  /** 바텀 sheet */
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false); // 경로설정 BottomSheet 열림 상태
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false); // 경로정렬 BottomSheet 열림 상태

  useEffect(() => {
    if (dayData.length === 0) {
      getRouteDetail(routeid as string).then((result) => {
        if (result.data.status !== 'ERROR' && result.status === 200) {
          let num = 0;
          setMemberId(result.data.data.course.memberId);
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

        setLoading(true);
      });
    }
  }, []);

  // useEffect(() => {
  //   GetUser(()=>{})
  // }, [memberId]);

  useEffect(() => {
    setSe([]);
    setMarker([]);
    getRouteDayDetail(routeid as string, selectedDay).then((result) => {
      if (result.status === 200) {
        let arr: DaysOfRouteProps[] = [];
        let lines: MapLinePathProps[] = [];
        result.data.data.wayPoints.map((ele: any) => {
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

          lines.push(line);

          let markerData: LineStartEndProps = {
            x: ele.lat,
            y: ele.lon,
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
            latitude: ele.lat,
            longitude: ele.lon,
            img: ele.img,
          };
          attArr.push(attData);
        });
        setAttractions(attArr);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    if (linePath.length > 0) {
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
            toast.error('해당경로는 길찾기를 제공하지 않습니다.');
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
                  toast.error('해당경로는 길찾기를 제공하지 않습니다.');
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
          };
          arr.push(data);
        });

        setReviews(arr);
      }
      setReviewLoading(true);
    });
  }, []);

  const deleteHandler = () => {
    RouteDelete(routeid as string)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <img
                src={
                  routeData.img.includes('test') ? defaultImg : routeData.img
                }
              />
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
                {routeType.map((ele: string) => (
                  <R.RouteType isLong={ele.length > 3}>{ele}</R.RouteType>
                ))}
              </R.RouteTypeContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGrenStar" size={13} />
                    {routeData.routeScore}
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
            />
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      <R.BottomContainer>
        <R.WriteTextBox
          onClick={() => {
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
              navigate('/schedule/addSchedule', {
                state: {
                  id: routeid,
                  latitude: latitude,
                  longitude: longitude,
                  ready: true,
                  start: routeData.start,
                  end: routeData.end,
                },
              });
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
        />
      )}
    </R.Container>
  ) : null;
}

export default RouteDetailPage;
