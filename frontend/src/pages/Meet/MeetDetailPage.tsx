import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { SchduleCardProps } from '@/models/schdule';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import { GetLineData } from '@/api/route/POST';
import {
  AttractionsProps,
  DaysOfRouteProps,
  LineStartEndProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteDetailProps,
} from '@/models/route';
import {
  getRouteDayAttraction,
  getRouteDayDetail,
  getRouteDetail,
} from '@/api/route/GET';
import { toast } from 'react-toastify';
import { GetMeetDetailList } from '@/api/meet/GET';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import { useQuery } from 'react-query';
import { STATUS } from '@/constants';
import { AxiosError } from 'axios';

function DetailMineSchedulePage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  /** 멤버 아이디 넘겨받기 */
  const { id } = useParams();
  // const { groupMemberId } = location.state || {};
  /** 헤더 설정 열기 */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  /* 경로 사용 값 */
  const [selected, setSelected] = useState<string>('course');
  const [courseId, setCourseId] = useState<number>(0);
  const [marker, setMarker] = useState<LineStartEndProps[]>([]);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState<MapLinePathProps[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [mapLines, setMapLines] = useState<any[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false); // 경로설정 BottomSheet 열림 상태
  const [isOpenSorting, setIsOpenSorting] = useState<boolean>(false); // 경로정렬 BottomSheet 열림 상태
  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const dummtFeedData = {
    routeFeedImg: goyuMY,
    routeUserImg: memberImg,
    routeName: '코스 이름(태종대 전망대)',
    routeContent: '이 코스는 초보자에게 적합합니다.',
    /** 출발일, 도착일 */
    startDate: '2024.08.04',
    endDate: '2024.08.16',
    /** 모집마감, 모집인원, 관심 (초깃값 0으로 해줘야해용) */
    memberCount: 10,
    totalMember: 20,
    likeCount: 1,
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

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    navigate(`/meet/edit`, {
      state: { id },
    });
  };

  /** 바텀탭 - 삭제 클릭시 */
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const { data: meetDetail } = useQuery(
    ['id', id],
    () => GetMeetDetailList(Number(id?.substring(1))),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          setCourseId(res.data.courseId);
        } else if (res.status === STATUS.error) {
          toast.error(res.message);
        }
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
      },
    },
  );

  useEffect(() => {
    if (courseId > 0) {
      if (dayData.length === 0) {
        getRouteDetail(String(courseId)).then((result) => {
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
        });
      }
    }
  }, [meetDetail]);

  useEffect(() => {
    setMarker([]);
    getRouteDayDetail(String(courseId), selectedDay).then((result) => {
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
      }
    });

    getRouteDayAttraction(String(courseId), selectedDay).then((res) => {
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
      GetLineData(linePath)
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
    if (latitude !== undefined) {
      setLoading(true);
    }
  }, [latitude]);

  useEffect(() => {
    if (dayOfRoute.length > 0 && dayOfRoute[0].latitude !== undefined) {
      setLatitude(dayOfRoute[0].latitude);
      setLongitude(dayOfRoute[0].longitude);
    }
  }, [dayOfRoute]);

  return (
    <MainPageContainer>
      <Header purpose="result" title="D-16" clickBack={() => navigate(-1)} />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed routeData={dummtFeedData} isUserContainer meetRouter />
            <FeedInfo
              feedInfoTitle="모임 일정 정보"
              departuresPlace={dummyFeedInfoData.departuresPlace}
              arrivalsPlace={dummyFeedInfoData.arrivalsPlace}
              startDate={dummyFeedInfoData.startDate}
              endDate={dummyFeedInfoData.endDate}
              totalDistance={dummyFeedInfoData.totalDistance}
              dayData={dummyFeedInfoData.dayData}
            />
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
                모임원
              </R.ContentBox>
            </R.ContentSelecContainer>
          </R.RouteInfoContainer>
          {/* 지도 및 하위 컴포넌트 container */}
          <R.RouteDetailInfoContainer>
            {loading ? (
              <RouteDetailInfo
                marker={marker}
                deleteHandler={(name: string) => {}}
                setSelectedIdx={setSelectedIdx}
                reviews={[]}
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
            ) : null}
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      {isOpen && (
        <BottomSheet
          selected={reviewType}
          setSelected={setReviewType}
          bsType={bsType}
          setIsOpen={setIsOpen}
          route="모임필터"
          bsTypeText={'설정'}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainPageContainer>
  );
}

export default DetailMineSchedulePage;

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;
