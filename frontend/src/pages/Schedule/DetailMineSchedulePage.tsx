import { useEffect, useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import {
  RunningScheduleProps,
  SchduleCardProps,
  ScheduleAttractionsProps,
} from '@/models/schdule';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import MeetModal from '@/components/Meet/MeetModal';
import {
  getDayNumData,
  getMyScheduleDetailData,
  getNearbyLocData,
} from '@/api/schedule/GET';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import {
  AttractionsProps,
  DaysOfRouteProps,
  LineStartEndProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
} from '@/models/route';
import { getRouteDayDetail, getRouteDetail } from '@/api/route/GET';
import { GetLineData } from '@/api/route/POST';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import { DeleteSchedule } from '@/api/schedule/Delete';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Icon from '@/components/common/Icon/Icon';
import { PutScheduleArrive } from '@/api/schedule/PUT';
import { cutAddress } from '@/utils/util';

function DetailMineSchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  /** 스케줄 아이디, dday 넘겨받기 */
  const location = useLocation();
  const { scheduleId, dDay } = location.state || {};
  /** 헤더 설정 열기 */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  /** 데이터 가져오기 */
  const [myScheduleListData, setMyScheduleListData] =
    useState<RunningScheduleProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  /** 관광지 */
  const [attractionsCard, setAttractionsCard] = useState<
    ScheduleAttractionsProps[]
  >([]);
  /** 코스 아이디 */
  const [courseId, setCourseId] = useState<number>(0);
  /** 루트 디테일  */
  /** 위치 가져오기*/
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [routeDayData, setRouteDayData] = useState<RouteDetailDayProps[]>([]);
  const [se, setSe] = useState<LineStartEndProps[]>([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [arriveGreen, setArriveGreen] = useState<boolean[]>([]);
  /** 현재 경유지 -> 다음 경유지 도착  */
  const [wayPoints, setWayPoints] = useState<DaysOfRouteProps[]>([]);
  const [currentWaypoint, setCurrentWaypoint] = useState(0); // 현재 경유지 인덱스
  const DISTANCE_THRESHOLD = 0.01; // 거리 기준 (1km 정도)
  const [isLocationReady, setIsLocationReady] = useState(false);

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    navigate(`/schedule/edit`, {
      state: { scheduleId },
    });
  };

  /** 바텀탭 - 삭제 클릭시 */
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  /** 모달 끄는 함수 */
  const delteModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsOpen(false);
  };

  /** 일정 삭제 */
  const deleteSchedule = async () => {
    try {
      setLoading(true);
      const response = await DeleteSchedule(scheduleId);
      if (response && response.status === 'SUCCESS') {
        toast.success('일정 삭제 완료되었습니다.');
        setIsDeleteModalOpen(false);
      } else {
        toast.error('일정 삭제 실패했습니다.');
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  };

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const feedData = {
    routeFeedImg: myScheduleListData?.backgroundImg || goyuMY,
    routeUserImg: memberImg,
    routeName: myScheduleListData?.title,
    routeContent: myScheduleListData?.content,
    routeTypes: myScheduleListData?.courseTypes || [],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyScheduleDetailData(scheduleId);

        if (response && response.status === 'SUCCESS') {
          setMyScheduleListData(response.data);
          setCourseId(response.data.courseId);
        } else {
          setError('데이터 가져오기 실패');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /** 주변 관광지 가져오기 */
  useEffect(() => {
    if (lat !== null && lon !== null && isLocationReady) {
      const nearByData = async () => {
        try {
          const response = await getNearbyLocData(lat || 0, lon || 0);
          if (response && response.status === 'SUCCESS') {
            const processedData = response.data.map(
              (item: ScheduleAttractionsProps) => ({
                ...item,
                address: cutAddress(item.address), // address 잘라주는 함수 적용
              }),
            );
            setAttractionsCard(processedData);
          } else {
            console.error('Error:', response.error);
          }
        } catch (error: unknown) {
          console.error('Fetch Error:', error);
          toast.error((error as AxiosError).message);
        } finally {
          setLoading(false);
        }
      };
      nearByData();
    }
  }, [isLocationReady]);

  useEffect(() => {
    /* 맵에 마커, 선 초기화 */
    setSe([]);
    setMarker([]);
    /*경로 일차별 경유지 정보 가져오기 */
    if (scheduleId > 0) {
      getDayNumData(selectedDay, scheduleId).then((result) => {
        if (result.status === 'SUCCESS') {
          let arr: DaysOfRouteProps[] = [];
          let lines: MapLinePathProps[] = [];
          /** 경유지 turnGreen 상태관리 */
          let greenStates: boolean[] = [];
          result.data.scheduleWayPointList.map((ele: any, idx: number) => {
            let data: DaysOfRouteProps = {
              routeName: ele.name,
              routeAddress: ele.address,
              routeType: ele.type,
              routeId: ele.scheduleWayPointId,
              latitude: ele.lat,
              longitude: ele.lon,
              state: ele.state,
              routePoint: (idx + 1).toString(),
            };
            arr.push(data);
            /* 다중 경유지 정보, 시작점, 도착점 저장 */

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
          setWayPoints(arr);

          /* 지도 중심점 잡기 */
          if (arr.length > 0 && arr[0] && arr[0].latitude && arr[0].longitude) {
            setLat(arr[0].latitude);
            setLon(arr[0].longitude);
            setIsLocationReady(true);
          } else {
            console.error('중심점 비어있음');
            setIsLocationReady(false);
          }
        }
      });
    }
  }, [selectedDay, scheduleId, arriveGreen]);

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
    const geo = window.navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
        },
        (error) => {
          console.error('Error occurred while fetching location:', error);
          alert('위치 가져오기 실패');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 20000,
        },
      );
    } else {
      alert('지원하지 않는 브라우저입니다.');
    }
  }, []);

  useEffect(() => {
    /** waypoint data */
    if (routeDayData.length === 0) {
      getRouteDetail(courseId.toString()).then((result) => {
        if (result.data.status !== 'ERROR' && result.status === 200) {
          let rd = {
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
          result.data.data.courseDays.forEach((ele: any) => {
            let data = {
              dayNum: ele.dayNumber,
              totalDistance: ele.total_distance,
              totalCalorie: ele.total_calorie,
              totalDuration: ele.total_duration,
            };
            setRouteDayData((prev) => [...prev, data]);
          });
        }
        setLoading(true);
      });
    }
  }, [courseId]);

  /** 내일정 - card 컴포넌트 'n박 n일' 계산 */
  const formatDate = (dateStr: string): string => {
    // Convert "YYYYMMDD" to "YYYY-MM-DD"
    const formattedDateStr = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;

    const date = new Date(formattedDateStr);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${weekday})`;

    return formattedDate;
  };

  /** n박 n일 */
  const calculateTripDay = (startDate: string, endDate: string): string => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const start = new Date(formattedStartDate);
    const end = new Date(formattedEndDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Invalid dates';
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const nights = diffDays > 0 ? diffDays - 1 : 0; // 날짜가 같은 경우 0박으로 처리
    return `${nights}박 ${diffDays === 0 ? 1 : diffDays}일`; // 같은 날짜일 경우 1일로 처리
  };

  const dayData =
    myScheduleListData?.scheduleDayResDtoList?.map((day, index) => ({
      dayNum: index + 1,
    })) || [];

  const formattedDistance = myScheduleListData?.totalDistance
    ? Number(myScheduleListData.totalDistance.toFixed(1)) // toFixed()의 결과를 숫자로 변환
    : 0;
  /** 경유지 처리 */

  /** 경유지 도착 시 해당 waypointId state 2 로 처리 */
  const arriveSchedule = async (waypointId: number) => {
    try {
      const response = await PutScheduleArrive(waypointId);

      if (response && response.data.status === 'SUCCESS') {
        setArriveGreen((prev) => [...prev, true]);
        // 상태 업데이트 후 데이터 새로 고침
        if (scheduleId > 0) {
          await getDayNumData(selectedDay, scheduleId);
        }
      } else if (response && response.data.status === 'ERROR') {
        toast.error(response.data.message);
        setError('도착처리 실패했습니다.');
      }
    } catch (error) {
      toast.error('도착처리 실패했습니다.');
    }
  };

  // 두 좌표 사이의 거리를 계산하는 함수 (단순 비교용)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // 위치 업데이트 처리 함수
  const handleLocationUpdate = (latitude: number, longitude: number) => {
    if (currentWaypoint < wayPoints.length) {
      const nextWaypoint = wayPoints[currentWaypoint];
      if (nextWaypoint) {
        const distance = calculateDistance(
          latitude,
          longitude,
          nextWaypoint.latitude,
          nextWaypoint.longitude,
        );

        if (distance < DISTANCE_THRESHOLD) {
          if (nextWaypoint.routeId !== undefined) {
            arriveSchedule(nextWaypoint.routeId);
          }
          setCurrentWaypoint((prev) => prev + 1);
        }
      } else {
        console.error('nextWaypoint is undefined');
      }
    }
  };

  useEffect(() => {
    const geo = window.navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
          setIsLocationReady(true);

          handleLocationUpdate(latitude, longitude);
        },
        (error) => {
          console.error('Error occurred while fetching location:', error);
          alert('위치 가져오기 실패');
          setIsLocationReady(false);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 20000,
        },
      );
    } else {
      alert('지원하지 않는 브라우저입니다.');
      setIsLocationReady(false);
    }
  }, []);

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="route-detail"
        title={dDay}
        back={true}
        clickBack={() => navigate(-1)}
        clickOption={() => {
          setIsOpen(true);
          setBsType('일정');
        }}
      />

      <R.Overflow>
        <R.RouteInfoContainer>
          <Feed routeData={feedData} isUserContainer />
          <FeedInfo
            feedInfoTitle="일정 정보"
            startPoint={myScheduleListData?.startPoint}
            endPoint={myScheduleListData?.endPoint}
            startDate={formatDate(myScheduleListData?.startDate || '')}
            endDate={formatDate(myScheduleListData?.endDate || '-')}
            totalDistance={formattedDistance}
            dayData={dayData}
          />
        </R.RouteInfoContainer>

        {/* 지도 및 하위 컴포넌트 container */}
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
            dayData={routeDayData}
            attractions={attractions}
            setLoading={setLoading}
            setSelectedDay={setSelectedDay}
            setIsOpen={setIsOpen}
            setBsType={setBsType}
            reviewType={reviewType}
            turnGreen={arriveGreen}
            isSchedule
          />
        </R.RouteDetailInfoContainer>
        <S.AttractionsContainer>
          <S.AttractionsBox>
            <S.AttrantiosTypeBox>주요 관광지</S.AttrantiosTypeBox>
            <S.AttractionsOverflow>
              {attractionsCard.length > 0 &&
                attractionsCard.map((ele) => (
                  <S.AttractionCard
                    img={(ele as ScheduleAttractionsProps).image1}
                  >
                    <S.AttractionCardTitle>
                      {(ele as ScheduleAttractionsProps).address}
                    </S.AttractionCardTitle>
                    <S.AttractionCardDetail>
                      <Icon name="IconFlag" size={20} />
                      <S.AttractionCardDetailText>
                        {(ele as ScheduleAttractionsProps).title}
                      </S.AttractionCardDetailText>
                    </S.AttractionCardDetail>
                  </S.AttractionCard>
                ))}
            </S.AttractionsOverflow>
          </S.AttractionsBox>
        </S.AttractionsContainer>
      </R.Overflow>

      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
          route="일정"
          bsTypeText={'설정'}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isDeleteModalOpen && (
        <MeetModal
          onCancel={delteModalClose}
          onConfirm={deleteSchedule}
          title="삭제하시겠어요?"
          content={'삭제하면 복구가 어렵습니다.'}
        />
      )}
      <BottomTab />
    </ScheduleMainPageContainer>
  );
}

export default DetailMineSchedulePage;

const ScheduleMainPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
