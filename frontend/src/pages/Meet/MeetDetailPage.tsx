import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';

import Header from '@/components/common/Header/Header';

import styled from 'styled-components';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import Feed from '@/components/Style/Common/Feed';
import FeedInfo from '@/components/Style/Common/FeedInfo';
import memberImg from '../../assets/img/memberImg.svg';

import goyuMY from '../../assets/img/goyuMY.png';
import { Member, SchduleCardProps } from '@/models/schdule';
import { useQuery } from 'react-query';
import { GetMeetDetailList } from '@/api/meet/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import {
  AttractionsProps,
  DaysOfRouteProps,
  LineStartEndProps,
  MapLinePathProps,
  RouteDetailDayProps,
  RouteDetailProps,
  RouteReviewProps,
} from '@/models/route';
import {
  getRouteDayAttraction,
  getRouteDayDetail,
  getRouteDetail,
} from '@/api/route/GET';
import { GetLineData } from '@/api/route/POST';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import BottomSheet from '@/components/Style/Route/BottomSheet';
import MeetModal from '@/components/Meet/MeetModal';
import { DeleteMeet } from '@/api/meet/Delete';

function DetailMineSchedulePage() {
  /** 헤더 설정 열기 */
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [bsType, setBsType] = useState<string>('설정');
  // const [reviewType, setReviewType] = useState<string>('공개 여부');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const location = useLocation();
  const { groupId } = location.state || {};
  const [memberData, setMemberData] = useState<Member>();
  const [error, setError] = useState<string | null>(null);

  const [routeId, setRouteId] = useState<number>(-1);
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(0);
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

  const BtnClick = () => {};
  const navigate = useNavigate();

  const { data: meetDetail } = useQuery(
    ['id', groupId],

    () => GetMeetDetailList(groupId),
    {
      onSuccess: (res) => {
        if (res.status === STATUS.success) {
          setRouteId(res.data.courseId);
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
    if (routeId > 0) {
      if (dayData.length === 0) {
        getRouteDetail(String(routeId)).then((result) => {
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
              setSelectedDay(1);
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
  }, [routeId]);

  useEffect(() => {
    setMarker([]);
    getRouteDayDetail(String(routeId), selectedDay).then((result) => {
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

        // setLatitude(arr[0].latitude);
        // setLongitude(arr[0].longitude);
      }
    });

    getRouteDayAttraction(String(routeId), selectedDay).then((res) => {
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

  // const [loading, setLoading] = useState<boolean>(false);

  // YYYYMMDD 형식을 YYYY.MM.DD로 변환하는 함수
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}.${month}.${day}`;
  };

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const feedData = {
    routeFeedImg: meetDetail?.data?.groupImg || goyuMY,
    routeUserImg: meetDetail?.data?.readerProfileImg || memberImg,
    routeName: meetDetail?.data?.title,
    routeContent: meetDetail?.data?.description,
    memberCount: meetDetail?.data?.recruitedCount,
    totalMember: meetDetail?.data?.recruitmentCount,
    likeCount: meetDetail?.data?.likeCount,
    startDate: formatDate(meetDetail?.data?.startDate),
    endDate: formatDate(meetDetail?.data?.endDate),
    meetDday: meetDetail?.data?.dday,
    meetTypes: meetDetail?.data?.courseTypes || [],
  };

  // const dayData = [{ dayNum: dayNum }];

  /** 바텀탭 - 수정 클릭시 */
  const handleEdit = () => {
    navigate(`/meet/edit`, {
      state: { groupId },
    });
  };

  /** 모달 끄는 함수 */
  const delteModalClose = () => {
    setIsDeleteModalOpen(false);
    setIsOpen(false);
  };

  /** 바텀탭 - 삭제 클릭시 */
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  /** 모임 삭제 */
  const deleteSchedule = async () => {
    try {
      setLoading(true);
      const response = await DeleteMeet(groupId);
      if (response && response.status === 'SUCCESS') {
        toast.success('모임 삭제 완료되었습니다.');
        setIsDeleteModalOpen(false);
      } else {
        toast.error('모임 삭제 실패했습니다.');
      }
    } catch (error) {
      toast.error('에러 발생');
    } finally {
      setIsDeleteModalOpen(false);
      setLoading(false);
    }
  };

  return loading && meetDetail !== undefined ? (
    <MainPageContainer>
      <Header
        purpose="schedule"
        title={`D-${meetDetail?.data?.dday}`}
        clickBack={() => navigate(-1)}
        clickOption={() => {
          setIsOpen(true);
          setBsType('모임필터');
        }}
      />

      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <Feed
              routeData={feedData}
              isUserContainer
              meetRouter
              isMeetFeed="8vh"
            />
            <FeedInfo
              feedInfoTitle="모임 일정 정보"
              departuresPlace={meetDetail?.data?.startPoint}
              arrivalsPlace={meetDetail?.data?.endPoint}
              startDate={formatDate(meetDetail?.data?.startDate)}
              endDate={formatDate(meetDetail?.data?.endDate)}
              totalDistance={totalDistance}
              dayData={meetDetail?.data?.totalDays}
              isMeetFeed="44rem"
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
                멤버
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
                setIsOpen={setIsOpen}
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

      {isDeleteModalOpen && (
        <MeetModal
          onCancel={delteModalClose}
          onConfirm={deleteSchedule}
          title="삭제하시겠어요?"
          content={'삭제하면 복구가 어렵습니다.'}
        />
      )}
    </MainPageContainer>
  ) : null;
}

export default DetailMineSchedulePage;

const MainPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  overflow-y: auto;
`;
