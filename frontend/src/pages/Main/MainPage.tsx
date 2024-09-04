import styled from 'styled-components';
import BottomTab from '@components/common/BottomTab/BottomTab';
import Schedule from '@components/Main/Schedule';
import Text from '@components/common/Text';
import Course from '@components/Main/Course';
import Meet from '@components/Main/Meet';
import Header from '@/components/common/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { signupStepAtom } from '@/atoms/signupStepAtom';
import { encodeToken, startDateEndDateStringFormat } from '@/utils/util';
import { colors } from '@/styles/colorPalette';
import * as R from '../../components/Style/Route/RouteList.styled';
import Icon from '@/components/common/Icon/Icon';
import NotHaveSchedule from '@/components/Main/NotHaveSchedule';
import MeetLongCard from '@/components/Meet/MeetLongCard';
import tempImg from '../../assets/img/mountain.jpg';
import DateBadge from '@/components/common/Badge/DateBadge';
import InfoBadge from '@/components/common/Badge/InfoBadge';
import RouteBadge from '@/components/common/Badge/RouteBadge';
import StarBadge from '@/components/common/Badge/StarBadge';
import Flex from '@/components/common/Flex';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMySchedule, getMyScheduleData } from '@/api/schedule/GET';
import { STATUS } from '@/constants';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { addInterestRoute, getMainRouteList } from '@/api/route/GET';
import { Root } from '@/models/root';
import { MeetInfo, MeetPageAble, MeetRequestDto } from '@/models/meet';
import { GetGroupList } from '@/api/meet/GET';
import { meetFilterInfoAtom } from '@/atoms/meetFilterAtom';
import { addInterestMeetToggle } from '@/api/meet/POST';
import { deleteInterestRoute } from '@/api/route/Delete';

function MainPage() {
  const navigator = useNavigate();
  const type = '초보자';

  const meetFilterInfo = useRecoilValue(meetFilterInfoAtom);

  const queryClient = useQueryClient();

  const [requestDto, setRequestDto] = useState<MeetRequestDto>({
    ...meetFilterInfo,
    pageable: {
      page: 0,
      size: 5,
      sort: 'likeCount, asc',
    },
  });

  const clickMoreBtn = (keyword: string) => {
    navigator('/route/list/more', { state: { keyword: keyword } });
  };

  // 내 일정
  const { data: mySchedule } = useQuery('getMySchedule', getMySchedule);

  // 경로(초보자 코스)
  const { data: routeList } = useQuery(['getRouteList', type], () =>
    getMainRouteList(type),
  );

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
  const { data: groupListData } = useQuery(
    ['getGroupList', requestDto.pageable.sort],
    () => GetGroupList(requestDto),
  );

  console.log(
    '지금 보이는 것의 id는 ',
    groupListData?.data.groupResDtoList[0].groupId,
  );

  // 모임 관심 등록 토글
  const { mutate: addMeetInterestToggle } = useMutation(addInterestMeetToggle, {
    onSuccess: (res) => {
      if (res.status === STATUS.success) {
        console.log(res);
        toast.success(res.message);
        queryClient.invalidateQueries({
          queryKey: ['getGroupList', requestDto.pageable.sort],
        });
      }
      if (res.status === STATUS.error) {
        toast.error(res.message);
      }
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
    },
  });

  const clickAddRouteInterest = (course_id: number) => {
    addRouteInterest(course_id);
  };

  const clickDeleteRouteInterest = (course_id: number) => {
    deleteRouteInterest(course_id);
  };

  const clickAddMeetInterest = (groupId: number) => {
    addMeetInterestToggle(groupId);
    // console.log(`${groupId} 눌림`);
  };

  return (
    <MainPageContainer>
      <Header purpose="main" $isborder={true} clickBack={() => {}} />
      <div className="container">
        {mySchedule &&
          (mySchedule.message === '조회된 일정이 없습니다.' ? (
            <NotHaveSchedule />
          ) : (
            <Schedule />
          ))}

        <div className="spacing" />

        {/* 경로 추천 */}
        {routeList && (
          <div className="route-container">
            <Flex $justify="space-between" $align="center">
              <Text $typography="t20" $bold={true}>
                동동님을 위한 추천코스
              </Text>

              <Flex $align="center" style={{ width: 'auto' }}>
                <Text $typography="t10">더 보기</Text>
                <Icon name="IconLeftBlackArrow" width={6} height={4} />
              </Flex>
            </Flex>
            {routeList.data.courseListMap[type].map((course: Root) => (
              <div className="main-smallCard" key={course.courseId}>
                <img src={tempImg} alt="그룹 이미지" />
                <DateBadge
                  totalDays={3}
                  style={{ top: '12px', left: '12px' }}
                />
                <Icon
                  name="IconModiHeartFill"
                  size={20}
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '12px',
                    zIndex: '3',
                  }}
                />

                <StarBadge
                  scoreAvg={course.scoreAvg}
                  style={{
                    position: 'absolute',
                    bottom: '50px',
                    left: '12px',
                    zIndex: '3',
                  }}
                />

                <Text
                  as="div"
                  $typography="t14"
                  $bold={true}
                  color="white"
                  style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '28px',
                    zIndex: '3',
                  }}
                >
                  {course.courseName}
                </Text>

                <RouteBadge
                  startPoint={course.startPoint}
                  endPoint={course.endPoint}
                  totalDistance={course.totalDistance}
                  style={{
                    left: '12px',
                    bottom: '12px',
                  }}
                />
                <div className="black-bg" />
              </div>
            ))}
          </div>
        )}

        <div className="spacing" />

        {/* 모임 추천 */}
        {groupListData &&
          groupListData.data.groupResDtoList.map((meet: MeetInfo) => (
            <div className="meet-container" key={meet.groupId}>
              <Flex $justify="space-between" $align="center">
                <Text $typography="t20" $bold={true}>
                  한품 PICK 모임 추천
                </Text>

                <Flex $align="center" style={{ width: 'auto' }}>
                  <Text $typography="t10">더 보기</Text>
                  <Icon name="IconLeftBlackArrow" width={6} height={4} />
                </Flex>
              </Flex>

              <div className="main-longCard">
                <img src={tempImg} alt="" />
                <DateBadge
                  style={{ top: '16px', left: '20px' }}
                  totalDays={meet.totalDays}
                />

                {/* 좋아요 아이콘 */}
                {meet.like ? (
                  <Icon
                    onClick={() => clickAddMeetInterest(meet.groupId)}
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
                    onClick={() => clickAddMeetInterest(meet.groupId)}
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
