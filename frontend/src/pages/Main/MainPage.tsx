import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

import BottomTab from '@components/common/BottomTab/BottomTab';
import Schedule from '@components/Main/Schedule';
import Text from '@components/common/Text';
import RouteCard from '@components/Style/Route/RouteCard';
import Header from '@components/common/Header/Header';
import { colors } from '@styles/colorPalette';
import Icon from '@/components/common/Icon/Icon';
import NotHaveSchedule from '@components/Main/NotHaveSchedule';
import DateBadge from '@components/common/Badge/DateBadge';
import InfoBadge from '@components/common/Badge/InfoBadge';
import RouteBadge from '@components/common/Badge/RouteBadge';
import Flex from '@components/common/Flex';
import { getMySchedule, getRunningScheduleData } from '@api/schedule/GET';
import { STATUS } from '@constants';
import {
  addInterestRoute,
  getMainRouteList,
  getRouteList,
} from '@/api/route/GET';
import { MeetInfo, MeetRequestDto } from '@models/meet';
import { GetGroupList } from '@api/meet/GET';
import { meetFilterInfoAtom } from '@atoms/meetFilterAtom';
import { addInterestMeetToggle } from '@api/meet/POST';
import { deleteInterestRoute } from '@api/route/Delete';
import { GetUser } from '@api/mypage/GET';
import { RouteListProps } from '@models/route';
import useQueryHandling from '@/hooks/global/useQueryHandling';
import Loading from '@/components/common/Loading';
import useIsAuth from '@/hooks/auth/useIsAuth';
import { DeleteMeetLike } from '@/api/meet/Delete';
import { isAuthEnticatedAtom, isInitAtom } from '@/atoms/isAuthEnticatedAtom';
import { encodeToken } from '@/utils/util';

function MainPage() {
  const navigator = useNavigate();
  const type = '초보자';

  const [routeLoading, setRouteLoading] = useState(false);

  const meetFilterInfo = useRecoilValue(meetFilterInfoAtom);

  const isAuth = useIsAuth();

  const setIsInit = useSetRecoilState(isInitAtom);

  const queryClient = useQueryClient();

  const [requestDto, setRequestDto] = useState<MeetRequestDto>({
    ...meetFilterInfo,
    pageable: {
      page: 0,
      size: 1,
      sort: 'likeCount,desc',
    },
  });

  const [routes, setRoutes] = useState<RouteListProps[]>([]);

  const clickMoreBtn = (keyword: string) => {
    navigator('/route/list/more', { state: { keyword: keyword } });
  };

  useEffect(() => {
    if (isAuth === false) {
      window.location.reload();
    }
  }, []);

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

  // 내 일정
  // const { data: mySchedule } = useQuery('getMySchedule', getMySchedule);
  const { data: mySchedule, isLoading: scheduleLoading } = useQueryHandling(
    'getMySchedule',
    getRunningScheduleData,
    {
      onSuccess: (data) => {
        // console.log('일정 불러오기 성공:', data);
      },
      onError: (error: AxiosError) => {},
    },
  );

  // 경로(초보자 코스)
  // const { data: routeList } = useQuery(['getRouteList', type], () =>
  //   getMainRouteList(type),
  // );
  const { data: routeList } = useQueryHandling(
    ['getRouteList', type],
    () => getMainRouteList(type),
    // {
    //   onSuccess: (data) => {
    //     console.log('경로 리스트 불러오기 성공:', data);
    //   },
    //   onError: (error: AxiosError) => {
    //     toast.error(`경로 리스트 불러오기 실패: ${error.message}`);
    //   },
    // },
  );

  // console.log('userInfo ::', userInfo.data.nickname);

  // 경로 관심 등록
  const { mutate: addRouteInterest } = useMutation(addInterestRoute, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteRouteInterest } = useMutation(deleteInterestRoute, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // 모임(인기순 1개)
  const { data: groupListData, isLoading } = useQueryHandling(
    ['getGroupList', requestDto.pageable.sort],
    () => GetGroupList(requestDto),
  );

  // 모임 관심 등록 토글
  const { mutate: addLike } = useMutation(addInterestMeetToggle, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        queryClient.invalidateQueries(['getGroupList']);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  // 관심 취소
  const { mutate: deleteLike } = useMutation(DeleteMeetLike, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        toast.success(res.message);
        queryClient.invalidateQueries(['getGroupList']);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const handleLike = (groupId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteLike(groupId);
  };

  const handleDisLike = (groupId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    addLike(groupId);
  };

  const clickAddRouteInterest = (course_id: number) => {
    addRouteInterest(course_id);
  };

  const clickDeleteRouteInterest = (course_id: number) => {
    deleteRouteInterest(course_id);
  };

  useEffect(() => {
    setRouteLoading(true);
    getRouteList('', 2).then((result) => {
      // console.log(routeLoading);
      if (result.status === 200) {
        result.data.data.courseListMap.searchResult.map((ele: any) => {
          let data: RouteListProps = {
            routeName: ele.courseName,
            routeContent: ele.content,
            routeScore: ele.scoreAvg,
            routeComment: ele.commentCnt,
            routeId: ele.courseId,
            img: ele.backgroundImg,
            writeState: ele.writeState,
            openState: ele.openState,
            memberId: ele.memberId,
            writeDate: ele.writeDate,
            start: ele.startPoint,
            end: ele.endPoint,
            totalDistance: Math.round(ele.totalDistance),
            totalDays: ele.totalDays,
            interestFlag: ele.interestFlag,
          };
          if (routes.length < 2) {
            setRoutes((pre) => [...pre, data]);
          }
          setRouteLoading(false);
        });
      }
      setRouteLoading(false);
    });
  }, [setRouteLoading]);

  const tryKakao = sessionStorage.getItem('send');
  // const setAuthEnticate = useSetRecoilState(isAuthEnticatedAtom);
  const navigate = useNavigate();

  useEffect(() => {
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (tryKakao === 'true') {
      const memberType = Cookies.get('memberType');

      if (memberType === 'KAKAO_INCOMPLETE') {
        navigate('/signup');
      }
    }
  }, []);

  if (routeLoading || isLoading || scheduleLoading) return <Loading />;

  return (
    <MainPageContainer>
      <Header purpose="main" $isborder={true} clickBack={() => {}} />
      <div className="container">
        {mySchedule &&
          (mySchedule.message === '유효한 일정이 없습니다.' ? (
            <NotHaveSchedule />
          ) : (
            <Schedule data={mySchedule.data} />
          ))}

        <div className="spacing" />

        <div className="route-container">
          <Flex $justify="space-between" $align="center">
            {userInfo && (
              <Text $typography="t20" $bold={true}>
                {userInfo.data.nickname}님을 위한 추천코스
              </Text>
            )}

            <Flex
              $align="center"
              style={{ width: 'auto' }}
              onClick={() => {
                // console.log('clic');
                navigator('/route/list');
              }}
            >
              <Text $typography="t10">더 보기</Text>
              <Icon name="IconLeftBlackArrow" width={6} height={4} />
            </Flex>
          </Flex>
          <Flex>
            {routes &&
              routes.map((ele) => <RouteCard ele={ele} key={ele.routeId} />)}
          </Flex>
        </div>

        <div className="spacing" />

        {groupListData &&
          groupListData.data.groupResDtoList.map((meet: MeetInfo) => (
            <div className="meet-container" key={meet.groupId}>
              <Flex $justify="space-between" $align="center">
                <Text $typography="t20" $bold={true}>
                  한품 PICK 모임 추천
                </Text>

                <Flex $align="center" style={{ width: 'auto' }}>
                  <Text
                    $typography="t10"
                    onClick={() => {
                      navigator('/meet/list');
                    }}
                  >
                    더 보기
                  </Text>
                  <Icon name="IconLeftBlackArrow" width={6} height={4} />
                </Flex>
              </Flex>

              <div
                className="main-longCard"
                onClick={() => {
                  navigator('/meet/detail', {
                    state: { groupId: meet.groupId },
                  });
                }}
              >
                <img src={meet.groupImg} alt="" />
                <DateBadge
                  style={{ top: '16px', left: '20px' }}
                  totalDays={meet.totalDays}
                />

                {meet.like ? (
                  <Icon
                    onClick={(e) => handleLike(meet.groupId, e)}
                    name="IconModiHeartFill"
                    size={20}
                    style={{
                      position: 'absolute',
                      top: '18px',
                      right: '20px',
                      zIndex: '3',
                    }}
                  />
                ) : (
                  <Icon
                    onClick={(e) => handleDisLike(meet.groupId, e)}
                    name="IconModiHeartNonFill"
                    size={20}
                    style={{
                      position: 'absolute',
                      top: '18px',
                      right: '20px',
                      zIndex: '3',
                    }}
                  />
                )}

                <Text
                  $typography="t14"
                  color="white"
                  $bold={true}
                  style={{
                    position: 'absolute',
                    bottom: '34px',
                    left: '20px',
                    zIndex: 3,
                  }}
                >
                  {meet.title}
                </Text>

                <InfoBadge
                  style={{ bottom: '20px', right: '20px' }}
                  recruitmentCount={meet.recruitmentCount}
                  recruitedCount={meet.recruitedCount}
                  likeCount={meet.likeCount}
                />

                <RouteBadge
                  style={{ bottom: '20px', left: '20px' }}
                  startPoint={meet.startDate}
                  endPoint={meet.endPoint}
                  totalDistance={meet.totalDistance}
                />

                <div className="black-bg" />
              </div>
            </div>
          ))}
        <BottomTab />
      </div>
      {/* <Loading /> */}
    </MainPageContainer>
  );
}

export default MainPage;

const MainPageContainer = styled.div`
  width: 100%;
  padding-bottom: 7vh;
  background-color: ${colors.white};
  .container {
    width: 100%;
    height: 100%;

    .spacing {
      width: 100%;
      height: 8px;
      background-color: #f5f5f5;
    }

    .meet-container {
      padding: 20px 16px;
      background-color: ${colors.white};
      .main-longCard {
        width: 100%;
        height: 16rem;
        border-radius: 20px;
        margin: 12px 0 20px;
        position: relative;
        overflow: hidden;
        .black-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .route-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 0;
      justify-content: space-between;
      padding: 20px 16px;
      .main-smallCard {
        width: 16.6rem;
        height: 16.6rem;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 16.6rem;
          border-radius: 12px;

          border: 1px solid #e1e1e1;
          box-sizing: border-box;
        }
        .black-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 2;
          border-radius: 12px;
        }
      }
    }
  }
`;
