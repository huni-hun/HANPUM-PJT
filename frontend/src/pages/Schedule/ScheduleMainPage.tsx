import { useEffect, useState } from 'react';
import * as S from '../../components/Style/Schedule/SchduleMainPage.styled';
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
  RunningScheduleProps,
  SchduleCardProps,
  WeatherProps,
} from '@/models/schdule';
import BottomTab from '@/components/common/BottomTab/BottomTab';
import RouteDetailInfo from '@/components/Style/Route/RouteDetailInfo';
import {
  AttractionsProps,
  FeedInfoProps,
  RouteDetailDayProps,
  RouteDetailProps,
} from '@/models/route';
import {
  getMyScheduleData,
  getRunningScheduleData,
  getWeather,
} from '@/api/schedule/GET';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

function ScheduleMainPage() {
  const BtnClick = () => {};
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<String>('Proceeding');

  /** 진행중 */
  const [runningScheduleData, setRunningScheduleData] =
    useState<RunningScheduleProps | null>(null);
  /** 내일정 */
  const [myScheduleListData, setMyScheduleListData] =
    useState<SchduleCardProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** 위치 가져오기*/
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherProps[]>([]);
  const [weatherWarning, setWeatherWarning] = useState<{
    weatherIcon: string;
    message: string;
  }>({
    weatherIcon: Error,
    message: 'warning massage',
  });

  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeData, setRouteData] = useState<RouteDetailProps>(null!);
  // const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [routeType, setRouteType] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [linePath, setLinePath] = useState([]);
  const [bsType, setBsType] = useState<string>('설정');
  const [reviewType, setReviewType] = useState<string>('최신순');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  /** feed 더미 데이터 */
  /** === useState (routeData) */
  const feedData = {
    routeFeedImg: runningScheduleData?.backgroundImg || goyuMY,
    routeUserImg: memberImg,
    routeName: runningScheduleData?.title,
    routeContent: runningScheduleData?.content,
  };

  /** feed 더미 데이터 */
  /** === useState (dayData) && (totalDistance) */
  const dummyFeedInfoData = {
    router: '일정',
    feedInfoTitle: '일정 정보',
    proceessDay: 1,
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

  /** 모임일정 */
  const dummyMemberData = {
    memberCount: 3,

    members: [
      {
        memberImg: memberImg,
        memberName: '김영우',
      },
      {
        memberImg: memberImg,
        memberName: '장효령',
      },
      {
        memberImg: memberImg,
        memberName: '심채운',
      },
    ],
    /** 배열로 받을 때 (컴포넌트 타입 변경 필요) 
    memberImgs: [memberImg, memberImg, memberImg],
    memberNames: ['김영우', '장효령', '심채운'],*/
  };

  const clickCard = (scheduleId?: number, dDay?: string) => {
    if (scheduleId !== undefined) {
      navigate(`/schedule/detail/mine`, {
        state: { scheduleId, dDay },
      });
    } else {
      console.error('스케줄 아이디 없음');
    }
  };

  const location = useLocation();
  const navigator = useNavigate();
  const data = { ...location };

  const [runningData, setRunningData] = useState<RunningScheduleProps[]>([]);

  /** 진행중 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = '';

        const response = await getRunningScheduleData(token);

        if (response && response.status === 'SUCCESS') {
          setRunningScheduleData(response.data);
        } else {
          setError('데이터 가져오기 실패');
        }
      } catch (error: unknown) {
        // unknown으로 지정
        console.error('Fetch Error:', error);

        toast.error((error as AxiosError).message); // 타입 단언 사용
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /** 내일정 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = '';

        const response = await getMyScheduleData(token);

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
  }, []);

  /** 날씨 */
  useEffect(() => {
    const fetchData = async () => {
      if (lat !== null && lon !== null) {
        try {
          const token = '';

          const response = await getWeather(lat, lon, token);

          if (response && response.status === 'SUCCESS') {
            setWeatherData(response.data);
          } else {
            setError('데이터 가져오기 실패');
          }
        } catch (error) {
          console.error('Fetch Error:', error);
          setError('데이터 가져오기 실패');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [lat, lon]);

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

  if (error) return <div>{error}</div>;

  if (
    !runningScheduleData ||
    !runningScheduleData.scheduleDayResDtoList ||
    runningScheduleData.scheduleDayResDtoList.length === 0
  ) {
    return <div>데이터가 없습니다.</div>;
  }

  const firstDayData = runningScheduleData.scheduleDayResDtoList[0];

  const departuresPlace =
    firstDayData.scheduleWayPointList?.find((point) => point.type === '출발지')
      ?.address || '';
  const arrivalsPlace =
    firstDayData.scheduleWayPointList?.find((point) => point.type === '도착지')
      ?.address || '';

  const dayData = runningScheduleData.scheduleDayResDtoList.map(
    (day, index) => ({
      dayNum: index + 1,
    }),
  );

  const feedInfoProps: FeedInfoProps = {
    feedInfoTitle: '일정 정보',
    departuresPlace,
    arrivalsPlace,
    startDate: '-',
    endDate: '-',
    totalDuration: parseFloat(firstDayData.totalDuration || '0'),
    totalDistance: parseFloat(firstDayData.totalDistance || '0'),
    dayData: dayData,
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

  return (
    <ScheduleMainPageContainer>
      <Header
        purpose="user"
        clickBack={() => navigate(-1)}
        isShadow
        plusBtnclick={() => navigate('/schedule/addSchedule')}
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
              {runningScheduleData ? (
                <>
                  <S.RouteInfoContainer>
                    <>
                      <Feed routeData={feedData} />
                      <FeedInfo
                        feedInfoTitle={feedInfoProps.feedInfoTitle}
                        departuresPlace={feedInfoProps.departuresPlace}
                        arrivalsPlace={feedInfoProps.arrivalsPlace}
                        startDate={formatDate(
                          runningScheduleData.startDate || '',
                        )}
                        endDate={formatDate(runningScheduleData.endDate || '-')}
                        totalDistance={feedInfoProps.totalDistance}
                        dayData={feedInfoProps.dayData}
                        percentage={feedInfoProps.percentage}
                      />
                    </>
                  </S.RouteInfoContainer>

                  {/* 1일차 진행 상황을 확인 + 달성률 ~~ 어쩌구 container */}
                  <S.ScheduleMainContainer>
                    <ProgressSchedule
                      proceessDay={calculateDayNumber(
                        runningScheduleData.startDate || '',
                      )}
                      departuresPlace={feedInfoProps.departuresPlace}
                      arrivalsPlace={feedInfoProps.arrivalsPlace}
                      totalDuration={feedInfoProps.totalDuration}
                      totalDistance={feedInfoProps.totalDistance}
                      dayData={feedInfoProps.dayData}
                      percentage={runningScheduleData.rate}
                    />
                  </S.ScheduleMainContainer>

                  {/* 날씨 + 날씨 메시지 container */}
                  <S.ScheduleMainContainer>
                    <WeatherSchedule
                      weatherData={weatherData}
                      weatherIcon={Error}
                      message={'warning message'}
                    />
                  </S.ScheduleMainContainer>

                  {/* 지도 및 하위 컴포넌트 container */}
                  <R.RouteDetailInfoContainer>
                    {/* 
              <RouteDetailInfo
                linePath={linePath}
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
              */}
                  </R.RouteDetailInfoContainer>
                </>
              ) : (
                <>일정이 없습니다.</>
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
              myScheduleListData.length > 0 &&
              myScheduleListData.map((data: SchduleCardProps) => {
                const tripDay = calculateTripDay(
                  data.startDate || '',
                  data.endDate || '',
                );

                const dDay = calculateDDay(data.startDate || '');

                const formattedStartDate = formatDate(data.startDate || '');
                const formattedEndDate = formatDate(data.endDate || '');

                return (
                  <SchduleCard
                    key={data.scheduleId}
                    backgroundImg={data.backgroundImg || goyuMY}
                    title={data.title}
                    startPoint={data.startPoint}
                    endPoint={data.endPoint}
                    startDate={formattedStartDate}
                    endDate={formattedEndDate}
                    tripDay={tripDay}
                    dDay={dDay}
                    onClick={() => clickCard(data.scheduleId, dDay)}
                  />
                );
              })}
          </S.Overflow>
        </S.Main>
      )}

      {/* 모임 일정 tab */}
      {isSelected === 'Class' && (
        <S.Main>
          <S.Overflow>
            <R.RouteInfoContainer>
              <Feed routeData={feedData} isUserContainer />
              <FeedInfo
                feedInfoTitle="모임 일정 정보"
                departuresPlace={dummyFeedInfoData.departuresPlace}
                arrivalsPlace={dummyFeedInfoData.arrivalsPlace}
                startDate={dummyFeedInfoData.startDate}
                endDate={dummyFeedInfoData.endDate}
                totalDistance={dummyFeedInfoData.totalDistance}
                dayData={dummyFeedInfoData.dayData}
              />
            </R.RouteInfoContainer>
            {/* 지도 및 하위 컴포넌트 container */}
            <R.RouteDetailInfoContainer>
              {/* <RouteDetailInfo
          selected={selected}
          selectedDay={selectedDay}
          latitude={latitude}
          longitude={longitude}
          dayData={dayData}
          attractions={attractions}
          setLoading={setLoading}
          setSelectedDay={setSelectedDay}
        /> */}
            </R.RouteDetailInfoContainer>
            {/* 모임멤버 */}
            <S.ScheduleMainContainer>
              <MeetMember
                memberCount={dummyMemberData.memberCount}
                members={dummyMemberData.members}
              />
            </S.ScheduleMainContainer>
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
`;
