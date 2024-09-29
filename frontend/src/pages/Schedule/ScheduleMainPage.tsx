import { useEffect, useState } from 'react';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon from '@/components/common/Icon/Icon';
import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import ProgressSchedule from '@/components/Schedule/ProgressSchedule';
import WeatherSchedule from '@/components/Schedule/WeatherSchedule';
import Error from '../../assets/icons/Error.svg';
import MeetMember from '@/components/Schedule/MeetMember';
import memberImg from '../../assets/img/memberImg.svg';
import SchduleCard from '@/components/Schedule/SchduleCard';
import scheduleBackgroundImg from '../../assets/img/scheduleBackground.png';
import goyuMY from '../../assets/img/goyuMY.png';
import {
  Member,
  RunningScheduleProps,
  SchduleCardProps,
  WeatherProps,
  ScheduleAttractionsProps,
  WayPoint,
} from '@/models/schdule';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import {
  AttractionsProps,
  DaysOfRouteProps,
  FeedInfoProps,
  LineStartEndProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
} from '@/models/route';
import {
  getDayNumData,
  getGroupScheduleData,
  getMyScheduleData,
  getNearbyLocData,
  getRunningScheduleData,
  getWeather,
} from '@/api/schedule/GET';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { getRouteDetail } from '@/api/route/GET';
import { GetLineData } from '@/api/route/POST';
import { PutScheduleArrive } from '@/api/schedule/PUT';
import ScheduleNoHave from '@/components/Schedule/ScheduleNoHave';
import NoHave from '@/components/My/NoHave';
import Loading from '@/components/common/Loading';
import { cutAddress } from '@/utils/util';
import { setDefaultImg } from '@/utils/Image';

function ScheduleMainPage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<'Proceeding' | 'Mine' | 'Class'>(
    'Proceeding',
  );
  /** 진행중 , 내일정, 모임 일정 데이터 state */
  const [runningScheduleData, setRunningScheduleData] =
    useState<RunningScheduleProps | null>(null);
  const [myScheduleListData, setMyScheduleListData] =
    useState<SchduleCardProps | null>(null);
  const [meetListData, setMeetListData] = useState<RunningScheduleProps | null>(
    null,
  );
  const [weatherWarning, setWeatherWarning] = useState<{
    weatherIcon: string;
    message: string;
  }>({
    weatherIcon: Error,
    message: 'warning massage',
  });

  /** 관광지 */
  const [attractionsCard, setAttractionsCard] = useState<
    ScheduleAttractionsProps[]
  >([]);
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  /** 위치 가져오기*/
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherProps[]>([]);
  const [isLocationReady, setIsLocationReady] = useState(false);
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  /** 현재 위치 */
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  /** 루트 디테일  */
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [routeDayData, setRouteDayData] = useState<RouteDetailDayProps[]>([]);
  const [se, setSe] = useState<LineStartEndProps[]>([]);
  /** 코스 아이디 */
  const [courseId, setCourseId] = useState<number>(0);
  const [scheduleId, setScheduleId] = useState<number>(0);
  /** 현재 경유지 -> 다음 경유지 도착  */
  const [wayPoints, setWayPoints] = useState<DaysOfRouteProps[]>([]);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0); // 현재 경유지 인덱스
  const DISTANCE_THRESHOLD = 0.01; // 거리 기준 (1km 정도)
  const [arriveGreen, setArriveGreen] = useState<boolean[]>([]);
  const location = useLocation();
  const navigator = useNavigate();
  const data = { ...location };
  /** 오늘 일정 달성률 */
  const [todayStartPoint, setTodayStartPoint] = useState<string>('출발지 없음');
  const [todayEndPoint, setTodayEndPoint] = useState<string>('도착지 없음');
  const [currentWayPoint, setCurrentWayPoint] = useState<string>('-');
  const [nextWayPoint, setNextWayPoint] = useState<string>('-');
  const [currentVisitCount, setCurrentVisitCount] = useState<number>(0);
  const [todayTotalVisitCount, setTodayTotalVisitCount] = useState<number>(0);
  const [todayTotalDistance, setTodayTotalDistance] = useState<number>(0);
  const [achievementPercentage, setAchievementPercentage] = useState<number>(0);

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

  /** 내일정 - card 컴포넌트 'd-day' 계산 */
  const calculateDDay = (startDate: string): string => {
    const formattedStartDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`;

    const today = new Date();
    const start = new Date(formattedStartDate);

    if (isNaN(start.getTime())) {
      console.error('Invalid start date:', startDate);
      return 'Invalid date';
    }

    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0
      ? `D-${diffDays}`
      : diffDays === 0
        ? 'D-Day'
        : `D+${Math.abs(diffDays)}`;
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

  /** 진행중 feed안에 들어가는 데이터 */
  const runningFeedData = {
    routeFeedImg: setDefaultImg(runningScheduleData?.backgroundImg || null),
    routeUserImg: memberImg,
    routeName: runningScheduleData?.title,
    routeContent: runningScheduleData?.content,
    routeTypes: runningScheduleData?.courseTypes || [],
  };

  /** 모임일정 feed안에 들어가는 데이터 */
  const meetFeedData = {
    routeFeedImg: setDefaultImg(meetListData?.backgroundImg || null),
    routeUserImg: memberImg,
    routeName: meetListData?.title,
    routeContent: meetListData?.content,
    routeTypes: meetListData?.courseTypes || [],
  };

  /** 내카드 선택 시 -> 내일정 상세 페이지로 */
  const clickCard = (scheduleId?: number, dDay?: string) => {
    if (scheduleId !== undefined) {
      navigate(`/schedule/detail/mine`, {
        state: { scheduleId, dDay },
      });
    } else {
      console.error('스케줄 아이디 없음');
    }
  };

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

  useEffect(() => {
    if (isLocationReady) {
      const interval = setInterval(() => {
        handleLocationUpdate(lat || 0, lon || 0);
      }, 5000); // 5초마다 위치 확인
      return () => clearInterval(interval);
    }
  }, [lat, lon, isLocationReady]);

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
    if (currentWaypointIndex < wayPoints.length) {
      const nextWaypoint = wayPoints[currentWaypointIndex];
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
          setCurrentWaypointIndex((prev) => prev + 1);
        }
      } else {
        console.error('다음 경유지가 없음');
      }
    }
  };

  /** 실시간 위치 가져오기 */
  useEffect(() => {
    const geo = window.navigator.geolocation;

    if (geo) {
      geo.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLon(longitude);
          setIsLocationReady(true);
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

  /** 진행중 get 데이터 가져오기 */
  useEffect(() => {
    if (isSelected === 'Proceeding') {
      /** 진행중 data */
      const fetchData = async () => {
        // setLoading(true);/
        try {
          const response = await getRunningScheduleData();
          if (response && response.status === 'SUCCESS') {
            setRunningScheduleData(response.data);
            setCourseId(response.data.courseId);
            setScheduleId(response.data.scheduleId);

            const scheduleWayPoints: WayPoint[] =
              response.data.scheduleWayPointList;
            if (scheduleWayPoints && scheduleWayPoints.length > 0) {
              // scheduleWayPoints 길이에 맞춰 arriveGreen 초기화
              const initialArriveGreen = scheduleWayPoints.map(
                (waypoint: WayPoint) => waypoint.state === 2,
              );
              setArriveGreen(initialArriveGreen);
            }
          } else if (response.status === 'ERROR') {
            // toast.error(response.message);
          }
        } catch (error: unknown) {
          // toast.error((error as AxiosError).message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isSelected, isLocationReady]);

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
        // setLoading(true);
      });
    }
  }, [courseId]);

  /** 내일정 */
  useEffect(() => {
    if (isSelected === 'Mine') {
      const fetchData = async () => {
        try {
          const response = await getMyScheduleData();
          if (response && response.status === 'SUCCESS') {
            setMyScheduleListData(response.data);
          } else if (response.status === 'ERROR') {
            // console.log(response.message);
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isSelected]);

  /** 모임일정 */
  useEffect(() => {
    if (isSelected === 'Class') {
      const fetchData = async () => {
        try {
          const response = await getGroupScheduleData();
          if (response && response.status === 'SUCCESS') {
            setMeetListData(response.data);
            setMemberData(response.data.groupMemberResDtoList);
            setCourseId(response.data.courseId);
            setScheduleId(response.data.scheduleId);
          } else if (response.status === 'ERROR') {
            // console.log(response.message);
          }
        } catch (error: unknown) {
          // console.error('Fetch Error:', error);
          toast.error((error as AxiosError).message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isSelected]);

  useEffect(() => {
    /* 맵에 마커, 선 초기화 */
    setSe([]);
    setMarker([]);
    /*경로 일차별 경유지 정보 가져오기 */
    if (isSelected !== 'Class') {
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
            setLatitude(arr[0].latitude);
            setLongitude(arr[0].longitude);
          }
        });
      }
    } else {
      let arr: DaysOfRouteProps[] = [];
      let lines: MapLinePathProps[] = [];
      meetListData?.scheduleDayResDtoList[
        selectedDay - 1
      ].scheduleWayPointList?.map((ele, idx: number) => {
        if (
          ele.name !== undefined &&
          ele.address !== undefined &&
          ele.type !== undefined &&
          ele.scheduleWayPointId !== undefined &&
          ele.lat !== undefined &&
          ele.lon !== undefined
        ) {
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
        }

        /* 다중 경유지 정보, 시작점, 도착점 저장 */

        let line: MapLinePathProps = {
          name: ele.name!,
          x: ele.lat!,
          y: ele.lon!,
        };

        lines.push(line);

        let markerData: LineStartEndProps = {
          x: ele.lat!,
          y: ele.lon!,
        };
        setMarker((pre) => [...pre, markerData]);
      });

      setDayOfRoute(arr);
      setLinePath(lines);

      setWayPoints(arr);
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
  }, [linePath, isLocationReady]);

  /** 진행중 데이터 때려넣기  */
  const firstDayData = runningScheduleData?.scheduleDayResDtoList[0];

  const startPoint =
    firstDayData?.scheduleWayPointList?.find((point) => point.type === '출발지')
      ?.address || '';
  const endPoint =
    firstDayData?.scheduleWayPointList?.find((point) => point.type === '도착지')
      ?.address || '';

  const dayData = runningScheduleData?.scheduleDayResDtoList.map(
    (day, index) => ({
      dayNum: index + 1,
    }),
  );

  /** 진행중 feed */
  const feedInfoProps: FeedInfoProps = {
    feedInfoTitle: '일정 정보',
    endPoint: endPoint || '',
    startPoint: startPoint || '',
    startDate: '-',
    endDate: '-',
    totalDuration: parseFloat(firstDayData?.totalDuration || '0'),
    totalDistance: parseFloat(firstDayData?.totalDistance || '0'),
    dayData: dayData || [],
    percentage: undefined,
    rate: undefined,
  };

  /** 진행중 tab 일차 계산 함수*/
  const calculateDayNumber = (startDateStr: string): number => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const startDate = new Date(
      parseInt(startDateStr.slice(0, 4)),
      parseInt(startDateStr.slice(4, 6)) - 1,
      parseInt(startDateStr.slice(6, 8)),
    );
    startDate.setHours(0, 0, 0, 0);

    const differenceInTime = currentDate.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays >= 0 ? differenceInDays + 1 : 0;
  };

  /** 진행중 - 날씨 */
  useEffect(() => {
    if (lat !== null && lon !== null && isLocationReady) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getWeather(lat, lon);

          if (response && response.status === 'SUCCESS') {
            setWeatherData(response.data);
          } else if (response.status === 'ERROR') {
            console.log(response.message);
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [isSelected, isLocationReady]);

  /** 모임 데이터 때려넣기 */
  const meetDayData = meetListData?.scheduleDayResDtoList[0];

  const meetStartPoint =
    meetDayData?.scheduleWayPointList?.find((point) => point.type === '출발지')
      ?.address || '';
  const meetEndPoint =
    meetDayData?.scheduleWayPointList?.find((point) => point.type === '도착지')
      ?.address || '';

  const meetscheduleDayResDtoList = meetListData?.scheduleDayResDtoList.map(
    (day, index) => ({
      dayNum: index + 1,
    }),
  );

  /** 모임 feed */
  const feedMeetInfoProps: FeedInfoProps = {
    feedInfoTitle: '모임 일정 정보',
    endPoint: meetStartPoint || '',
    startPoint: meetEndPoint || '',
    startDate: '-',
    endDate: '-',
    totalDuration: parseFloat(meetDayData?.totalDuration || '0'),
    totalDistance: parseFloat(meetDayData?.totalDistance || '0'),
    dayData: meetscheduleDayResDtoList || [],
    percentage: undefined,
    rate: undefined,
  };

  /** 주변 관광지 가져오기 */
  useEffect(() => {
    if (lat !== null && lon !== null && isLocationReady) {
      const nearByData = async () => {
        try {
          const response = await getNearbyLocData(lat || 0, lon || 0);
          if (response && response.status === 'SUCCESS') {
            setAttractionsCard(response.data);
          } else if (response.status === 'ERROR') {
            // console.log(response.message);
          }
        } catch (error: unknown) {
          toast.error((error as AxiosError).message);
        } finally {
          setLoading(false);
        }
      };
      nearByData();
    }
  }, [isLocationReady]);

  /** 관광지 클릭 */
  const clickAttraction = (index: number) => {
    navigate('/schedule/memo', {
      state: { attractionIndex: index, attractionsCard },
    });
  };

  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10).replace(/-/g, ''); // "YYYYMMDD" 형식으로 변환
  };

  useEffect(() => {
    // 현재 날짜 가져오기
    const currentDate = getCurrentDate();

    // runningScheduleData가 존재하고, scheduleDayResDtoList가 있는지 확인
    if (runningScheduleData && runningScheduleData.scheduleDayResDtoList) {
      // 현재 날짜와 일치하는 데이터를 찾기
      const todaySchedule = runningScheduleData?.scheduleDayResDtoList.find(
        (day) => day.date === currentDate,
      );

      if (todaySchedule && todaySchedule.scheduleWayPointList) {
        // 출발지와 도착지 설정
        const startPointName =
          todaySchedule.scheduleWayPointList[0]?.name || '';
        const endPointName =
          todaySchedule.scheduleWayPointList[
            todaySchedule.scheduleWayPointList.length - 1
          ]?.name || '';
      } else {
        toast.error('오늘 일정이 없습니다.');
      }
    }
  }, [runningScheduleData]);

  // 진행중일 때 오늘 달성률 계산하는 부분을 useEffect로 감싸기
  useEffect(() => {
    if (isSelected === 'Proceeding' && runningScheduleData) {
      /** 오늘 달성률 계산 */
      const today: string = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, ''); // '20240926' 형식으로 변환
      const todaySchedule = runningScheduleData?.scheduleDayResDtoList?.find(
        (schedule) => schedule.date === today,
      );

      if (todaySchedule) {
        setTodayStartPoint(
          todaySchedule?.scheduleWayPointList?.[0]?.name || '출발지 없음',
        );
        setTodayEndPoint(
          todaySchedule?.scheduleWayPointList?.[
            todaySchedule?.scheduleWayPointList.length - 1
          ]?.name || '도착지 없음',
        );

        const scheduleWayPointList = todaySchedule?.scheduleWayPointList || [];

        // 현재 경유지의 인덱스(마지막 state = 2)
        let currentPointIndex: number | undefined = undefined;
        for (let i = scheduleWayPointList.length - 1; i >= 0; i--) {
          if (scheduleWayPointList[i].state === 2) {
            currentPointIndex = i;
            break;
          }
        }

        // 현재 경유지
        setCurrentWayPoint(
          currentPointIndex !== undefined && currentPointIndex >= 0
            ? scheduleWayPointList[currentPointIndex]?.name || '-'
            : '-',
        );

        // 다음 경유지
        setNextWayPoint(
          currentPointIndex !== undefined &&
            currentPointIndex >= 0 &&
            currentPointIndex < scheduleWayPointList.length - 1
            ? scheduleWayPointList[currentPointIndex + 1]?.name || '-'
            : '-',
        );

        // 현재 방문한 경유지 개수 계산
        const currentVisit =
          scheduleWayPointList?.filter((point) => point.state === 2).length ||
          0;
        setCurrentVisitCount(currentVisit);

        // 총 경유지 개수
        const totalVisitCount = scheduleWayPointList?.length || 0;
        setTodayTotalVisitCount(totalVisitCount);

        // 오늘의 총 거리
        setTodayTotalDistance(
          todaySchedule?.totalDistance !== undefined
            ? parseFloat(todaySchedule.totalDistance)
            : 0,
        );

        // 달성률 퍼센트 계산
        const percentage =
          totalVisitCount > 0 ? (currentVisit / totalVisitCount) * 100 : 0;
        setAchievementPercentage(percentage);
      }
    }
  }, [isSelected, runningScheduleData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="merge"
        clickBack={() => navigate(-1)}
        $isborder={true}
        plusBtnclick={() =>
          navigate('/schedule/addSchedule', { state: { ready: false } })
        }
        isSchedule
      />

      <S.SchduleTypeContainer>
        <S.SchduleTypeBox>
          <S.ScheduleType
            isSelected={isSelected === 'Proceeding'}
            onClick={() => {
              setIsSelected('Proceeding');
            }}
          >
            진행중
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'Mine'}
            onClick={() => {
              setIsSelected('Mine');
            }}
          >
            내 일정
          </S.ScheduleType>
          <S.ScheduleType
            isSelected={isSelected === 'Class'}
            onClick={() => {
              setIsSelected('Class');
            }}
          >
            모임일정
          </S.ScheduleType>
        </S.SchduleTypeBox>
      </S.SchduleTypeContainer>
      {/* 진행중 tab */}
      {isSelected === 'Proceeding' && (
        <S.Main>
          <S.Overflow>
            <>
              {runningScheduleData &&
              runningScheduleData.scheduleDayResDtoList ? (
                <>
                  <S.RouteInfoContainer>
                    <>
                      <Feed routeData={runningFeedData} />
                      <FeedInfo
                        feedInfoTitle="일정 정보"
                        startDate={formatDate(
                          runningScheduleData.startDate || '',
                        )}
                        endDate={formatDate(runningScheduleData.endDate || '')}
                        startPoint={runningScheduleData.startPoint}
                        endPoint={runningScheduleData.endPoint}
                        totalDistance={runningScheduleData.totalDistance}
                        dayData={dayData || []}
                        percentage={undefined}
                      />
                    </>
                  </S.RouteInfoContainer>
                  {/* 일차 진행 상황 + 오늘 달성률을 */}
                  <S.ScheduleMainContainer>
                    <div className="today_rate_box">
                      <ProgressSchedule
                        proceessDay={calculateDayNumber(
                          runningScheduleData?.startDate || '',
                        )}
                        startPoint={todayStartPoint}
                        endPoint={todayEndPoint}
                        totalDuration={
                          typeof firstDayData?.totalDuration === 'string'
                            ? parseFloat(firstDayData.totalDuration)
                            : firstDayData?.totalDuration || 0
                        }
                        totalDistance={
                          typeof firstDayData?.totalDistance === 'string'
                            ? parseFloat(firstDayData.totalDistance)
                            : firstDayData?.totalDistance || 0
                        }
                        dayData={dayData || []}
                        currentWayPoint={currentWayPoint} // 현재 경유지
                        nextWayPoint={nextWayPoint} // 다음 경유지
                        currentVisitCount={currentVisitCount}
                        todayTotalVisitCount={todayTotalVisitCount}
                        todayTotalDistance={todayTotalDistance}
                        percentage={achievementPercentage} // 오늘 달성률 퍼센트
                      />
                    </div>
                    <S.ScheduleWeatherContainer>
                      {weatherData.length > 0 && (
                        <WeatherSchedule
                          logcation={'현재위치'}
                          weatherData={weatherData}
                          weatherIcon={Error}
                          message={'warning message'}
                        />
                      )}
                    </S.ScheduleWeatherContainer>
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
                  </S.ScheduleMainContainer>

                  {/* 지도 및 하위 컴포넌트 container */}

                  <R.RouteDetailInfoContainer>
                    {lat !== null && lon !== null && (
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
                        latitude={lat}
                        longitude={lon}
                        dayData={routeDayData}
                        attractions={attractions}
                        setLoading={setLoading}
                        setSelectedDay={setSelectedDay}
                        setIsOpen={setIsOpen}
                        setBsType={setBsType}
                        reviewType={reviewType}
                        turnGreen={arriveGreen}
                        isSchedule={true}
                      />
                    )}
                  </R.RouteDetailInfoContainer>
                  <S.AttractionsContainer>
                    <S.AttractionsBox>
                      <S.AttrantiosTypeBox>주요 관광지</S.AttrantiosTypeBox>
                      <S.AttractionsOverflow>
                        {attractionsCard.length > 0 &&
                          attractionsCard.map((ele) => (
                            <S.AttractionCard
                              img={(ele as ScheduleAttractionsProps).img}
                            >
                              <S.AttractionCardTitle>
                                {(ele as ScheduleAttractionsProps).address}
                              </S.AttractionCardTitle>
                              <S.AttractionCardDetail>
                                <Icon name="IconFlag" size={20} />
                                <S.AttractionCardDetailText>
                                  {(ele as ScheduleAttractionsProps).name}
                                </S.AttractionCardDetailText>
                              </S.AttractionCardDetail>
                            </S.AttractionCard>
                          ))}
                      </S.AttractionsOverflow>
                    </S.AttractionsBox>
                  </S.AttractionsContainer>
                </>
              ) : (
                <ScheduleNoHave category="schedule" />
              )}
            </>
          </S.Overflow>
        </S.Main>
      )}

      {/* 내 일정 tab */}
      {isSelected === 'Mine' && (
        <S.Main>
          <S.Overflow>
            {myScheduleListData &&
            Array.isArray(myScheduleListData) &&
            myScheduleListData.length > 0 ? (
              myScheduleListData.map((data: SchduleCardProps) => {
                const tripDay = calculateTripDay(
                  data.startDate || '',
                  data.endDate || '',
                );

                const dDay = calculateDDay(data.startDate || '');
                const formattedStartDate = formatDate(data.startDate || '');
                const formattedEndDate = formatDate(data.endDate || '');

                return (
                  <S.SchduleCardContainer key={data.scheduleId}>
                    <SchduleCard
                      backgroundImg={setDefaultImg(data.backgroundImg || '')}
                      title={data.title}
                      startPoint={data.startPoint}
                      endPoint={data.endPoint}
                      startDate={formattedStartDate}
                      endDate={formattedEndDate}
                      tripDay={tripDay}
                      dDay={dDay}
                      onClick={() => clickCard(data.scheduleId, dDay)}
                    />
                  </S.SchduleCardContainer>
                );
              })
            ) : (
              <ScheduleNoHave category="schedule" />
            )}
          </S.Overflow>
        </S.Main>
      )}

      {/* 모임 일정 tab */}
      {isSelected === 'Class' && (
        <S.Main>
          <S.Overflow>
            {meetListData ? (
              <>
                <R.RouteInfoContainer>
                  <Feed routeData={meetFeedData} isUserContainer />
                  <FeedInfo
                    feedInfoTitle="모임 일정 정보"
                    startPoint={feedMeetInfoProps.startPoint}
                    endPoint={feedMeetInfoProps.endPoint}
                    startDate={formatDate(meetListData?.startDate || '')}
                    endDate={formatDate(meetListData?.endDate || '-')}
                    totalDistance={feedMeetInfoProps.totalDistance}
                    dayData={feedMeetInfoProps.dayData}
                  />
                </R.RouteInfoContainer>
                {/* 지도 및 하위 컴포넌트 container */}
                <R.RouteDetailInfoContainer>
                  {lat !== null && lon !== null && (
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
                      latitude={lat}
                      longitude={lon}
                      dayData={routeDayData}
                      attractions={attractions}
                      setLoading={setLoading}
                      setSelectedDay={setSelectedDay}
                      setIsOpen={setIsOpen}
                      setBsType={setBsType}
                      reviewType={reviewType}
                      turnGreen={arriveGreen}
                      isSchedule={true}
                    />
                  )}
                </R.RouteDetailInfoContainer>
                {/* 모임멤버 */}
                <S.ScheduleMainContainer>
                  <div className="marginBottom">
                    <MeetMember
                      memberCount={memberData.length}
                      members={memberData || []}
                    />
                  </div>
                </S.ScheduleMainContainer>
              </>
            ) : (
              <NoHave category="" />
            )}
          </S.Overflow>
        </S.Main>
      )}
      <BottomTab />
    </ScheduleMainPageContainer>
  );
}

export default ScheduleMainPage;

const ScheduleMainPageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  /* background-color: #fff; */
`;
