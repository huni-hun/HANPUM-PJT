import { useEffect, useState } from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { RunningScheduleProps, SchduleCardProps } from '@/models/schdule';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import MeetModal from '@/components/Meet/MeetModal';
import { getMyScheduleDetailData } from '@/api/schedule/GET';
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

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const feedData = {
    routeFeedImg: myScheduleListData?.backgroundImg || goyuMY,
    routeUserImg: memberImg,
    routeName: myScheduleListData?.title,
    routeContent: myScheduleListData?.content,
  };

  /** feed 더미 데이터 */
  /** === useState (dayData) && (totalDistance) */
  const dummyFeedInfoData = {
    router: '일정',
    feedInfoTitle: '일정 정보',
    /** 출발지 , 도착지 */
    departuresPlace: '태종대 전망대',
    arrivalsPlace: '태종대 전망대',
    /** 출발일, 도착일 */
    startDate: '2024.08.04',
    endDate: '2024.08.16',
    /** 거리 */
    currentDistance: 100,
    totalDistance: 200,
    dayData: [{ dayNum: 1 }, { dayNum: 2 }, { dayNum: 3 }],
    /** 오늘 일정 달성률 퍼센트 */
    percent: 30,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyScheduleDetailData(scheduleId);

        if (response && response.status === 'SUCCESS') {
          setMyScheduleListData(response.data);
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

    if (routeDayData.length === 0) {
      /*경로 상세 정보 가져오기 */
      /*이 정보 안가져 오면 총 몇일인지 알 수 없어서 가져와야 됩니다.*/
      getRouteDetail('1' as string).then((result) => {
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
          };
          setRouteData(rd);
          result.data.data.courseDays.map((ele: any) => {
            let data: RouteDetailDayProps = {
              dayNum: ele.dayNumber,
              totalDistance: ele.total_distance,
              totalCalorie: ele.total_calorie,
              totalDuration: ele.total_duration,
            };
            setRouteDayData((pre) => [...pre, data]);
          });
        }

        setLoading(true);
      });
    }
  }, []);

  useEffect(() => {
    /* 맵에 마커, 선 초기화 */
    setSe([]);
    setMarker([]);
    /*경로 일차별 경유지 정보 가져오기 */
    getRouteDayDetail('1' as string, selectedDay).then((result) => {
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
          /* 다중 경유지 정보, 시작점, 도착점 저장 */
          if (ele.type === '경유지') {
            let line: MapLinePathProps = {
              name: ele.name,
              x: ele.lat,
              y: ele.lon,
            };

            lines.push(line);
          } else {
            let seData: LineStartEndProps = {
              x: ele.lat,
              y: ele.lon,
            };
            setSe((pre) => [...pre, seData]);
          }
          let markerData: LineStartEndProps = {
            x: ele.lat,
            y: ele.lon,
          };
          setMarker((pre) => [...pre, markerData]);
        });
        arr.sort((a: any, b: any) => a.routePoint - b.routePoint);
        setDayOfRoute(arr);
        setLinePath(lines);
        /* 지도 중심점 잡기 */
        setLatitude(arr[0].latitude);
        setLongitude(arr[0].longitude);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    if (linePath.length > 0) {
      const mapLines: any[] = [];
      /* 다중 경유지 경로 가져오기 */
      GetLineData(linePath, se[0], se[1])
        .then((res) => {
          if (res.status === 200 && res.data.status === 'SUCCESS') {
            res.data.data.map((ele: any) => {
              ele.vertexes.map((vertex: any, index: number) => {
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
            setMapLines(mapLines);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
        () => {
          alert('위치 가져오기 실패');
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        },
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

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
    ? parseFloat(parseFloat(myScheduleListData.totalDistance).toFixed(1))
    : 0;

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
            departuresPlace={myScheduleListData?.startPoint}
            arrivalsPlace={myScheduleListData?.endPoint}
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
          />
        </R.RouteDetailInfoContainer>
      </R.Overflow>
      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
          route="일정"
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isDeleteModalOpen && (
        <MeetModal
          onCancel={delteModalClose}
          onConfirm={() => {}}
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  overflow-y: auto;
`;
