import Icon from '@/components/common/Icon/Icon';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import { useEffect, useState } from 'react';
import Select from '@/components/common/Select/Select';
import { useParams } from 'react-router-dom';
import {
  getRouteDayDetail,
  getRouteDetail,
  getRouteReview,
} from '@/api/route/GET';
import {
  AttractionsProps,
  DaysOfRouteProps,
  RouteDetailDayProps,
  RouteReviewProps,
} from '@/models/route';
import Header from '@/components/common/Header/Header';
import Map from '@/components/common/Map/Map';
import RoutePlaceCard from '@/components/Style/Route/RoutePlaceCard';
import Button from '@/components/common/Button/Button';
import AttractionsCard from '@/components/Style/Route/AttractionsCard';
import ReviewCard from '@/components/Style/Route/ReviewCard';

function RouteDetailPage() {
  const { routeid } = useParams();
  const [selected, setSelected] = useState<string>('course');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');
  const [routeContent, setRouteContent] = useState<string>('');
  const [writeDate, setWriteDate] = useState<string>('');
  const [dayData, setDayData] = useState<RouteDetailDayProps[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [attractions, setAttractions] = useState<AttractionsProps[]>([]);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);

  useEffect(() => {
    getRouteDayDetail(routeid as string, selectedDay).then((result) => {
      if (result.status === 200) {
        let arr: DaysOfRouteProps[] = [];
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
        });
        setDayOfRoute(arr);
      }
    });
  }, [selectedDay]);

  useEffect(() => {
    if (dayData.length === 0) {
      getRouteDetail(routeid as string).then((result) => {
        if (result.status === 200) {
          let num = 0;
          setRouteName(result.data.data.course.courseName);
          setRouteContent(result.data.data.course.content);
          result.data.data.courseDays.map((ele: any) => {
            let data: RouteDetailDayProps = {
              dayNum: ele.dayNumber,
              totalDistance: ele.total_distance,
              totalCalorie: ele.total_calorie,
              totalDuration: ele.total_duration,
            };
            setDayData((pre) => [...pre, data]);
            num += Number(ele.total_distance.split('k')[0]);
          });
          setWriteDate(result.data.data.course.writeDate);
          setTotalDistance(num);
          setLatitude(result.data.data.attractions[0].lat);
          setLongitude(result.data.data.attractions[0].lon);

          let attArr: AttractionsProps[] = [];
          result.data.data.attractions.map((ele: any) => {
            let attData: AttractionsProps = {
              name: ele.name,
              type: ele.type,
              attractionId: ele.attractionId,
              address: ele.address,
              latitude: ele.lat,
              longitude: ele.lon,
            };
            attArr.push(attData);
          });
          setAttractions(attArr);
        }

        getRouteReview(routeid as string).then((result) => {
          let arr: RouteReviewProps[] = [];
          if (result.status === 200) {
            result.data.data.map((ele: any) => {
              let data: RouteReviewProps = {
                memberId: ele.memberId,
                routeId: ele.courseId,
                content: ele.content,
                score: ele.score,
                writeDate: ele.writeDate,
              };
              arr.push(data);
            });

            setReviews(arr);
          }
        });
        setLoading(true);
      });
    }
  }, []);

  return loading ? (
    <R.Container>
      <Header purpose="route-detail" back={true} />
      <R.Main>
        <R.Overflow>
          <R.RouteInfoContainer>
            <R.ImgBox></R.ImgBox>
            <R.UserContainer>
              <R.UserImgBox></R.UserImgBox>
              <R.UserName>작성자</R.UserName>
            </R.UserContainer>
            <R.RouteNameInfo>
              <R.RouteNameInfoContainer>
                <R.RouteName>{routeName}</R.RouteName>
                <R.RouteInfo>{routeContent}</R.RouteInfo>
              </R.RouteNameInfoContainer>
              <R.RouteReviewContainer>
                <R.IconContainer>
                  <R.IconBox>
                    <Icon name="IconGreyStar" size={10} />
                    3.5
                  </R.IconBox>
                  <R.IconBox>
                    <Icon
                      name="IconGreyReview"
                      size={10}
                      style={{ marginLeft: '0.9rem' }}
                    />
                    3
                  </R.IconBox>
                </R.IconContainer>
                <R.WriteDateBox>{writeDate}</R.WriteDateBox>
              </R.RouteReviewContainer>
            </R.RouteNameInfo>
            <R.RouteDateBox>
              <R.StartDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 이동거리</R.DistanceText>
                  <R.Distance>{totalDistance}km</R.Distance>
                </R.DistanceBox>
              </R.StartDateBox>
              <R.EndDateBox>
                <R.DateBox>
                  <R.DateText>출발일 2024.08.04 </R.DateText>
                  <R.DateText>도착일 2024.08.16 </R.DateText>
                </R.DateBox>
                <R.DistanceBox>
                  <R.DistanceText>총 일정기간</R.DistanceText>
                  <R.Distance>
                    {dayData[dayData.length - 1].dayNum - 1}박{' '}
                    {dayData[dayData.length - 1].dayNum}일
                  </R.Distance>
                </R.DistanceBox>
              </R.EndDateBox>
            </R.RouteDateBox>
            <R.ContentSelecContainer>
              <R.ContentBox
                isSelected={selected === 'course'}
                onClick={() => {
                  setSelected('course');
                }}
              >
                코스
              </R.ContentBox>
              <R.ContentBox
                isSelected={selected === 'information'}
                onClick={() => {
                  setSelected('information');
                }}
              >
                정보
              </R.ContentBox>
              <R.ContentBox
                isSelected={selected === 'review'}
                onClick={() => {
                  setSelected('review');
                }}
              >
                리뷰
              </R.ContentBox>
            </R.ContentSelecContainer>
          </R.RouteInfoContainer>
          <R.RouteDetailInfoContainer>
            {selected === 'course' && (
              <R.MapBox>
                <Map latitude={latitude} longitude={longitude} />
              </R.MapBox>
            )}
            {selected != 'review' ? (
              <R.DetailHeader>
                <R.HeaderOverflow>
                  {selected === 'course' ? (
                    dayData.map((ele) => (
                      <R.DayContainer>
                        <R.DayBox
                          isSelected={ele.dayNum === selectedDay}
                          onClick={() => {
                            setSelectedDay(ele.dayNum);
                          }}
                        >{`Day ${ele.dayNum}`}</R.DayBox>
                      </R.DayContainer>
                    ))
                  ) : (
                    <R.DetailHeaderTitle>주요 관광지</R.DetailHeaderTitle>
                  )}
                </R.HeaderOverflow>
              </R.DetailHeader>
            ) : (
              <R.ReviewHeader>
                <Select
                  list={['최근 수정순', '별점순']}
                  width={20}
                  height={2}
                  radius={0}
                  border=""
                  fontSize={1.5}
                  fontColor="a0a0a0"
                  padding={0}
                  isOpen={isOpen}
                  setOpen={() => {
                    setIsOpen(!isOpen);
                  }}
                  onClick={() => {}}
                />
              </R.ReviewHeader>
            )}
            <R.DetailMain>
              <R.DetailMainOverflow>
                {selected != 'review' ? (
                  selected === 'course' ? (
                    <>
                      {dayOfRoute.length > 0
                        ? dayOfRoute.map((ele) => <RoutePlaceCard {...ele} />)
                        : null}
                    </>
                  ) : (
                    attractions.map((ele: AttractionsProps) => (
                      <AttractionsCard {...ele} />
                    ))
                  )
                ) : (
                  reviews.map((ele: RouteReviewProps) => (
                    <ReviewCard {...ele} />
                  ))
                )}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </R.RouteDetailInfoContainer>
        </R.Overflow>
      </R.Main>
      <R.BottomContainer>
        <R.ButtonBox>
          <Button
            width={35}
            height={6}
            fontColor="ffffff"
            backgroundColor="#1A823B"
            radius={0.7}
            fontSize={1.6}
            children="일정 생성"
            color="#ffffff"
            onClick={() => {}}
          />
        </R.ButtonBox>
      </R.BottomContainer>
    </R.Container>
  ) : null;
}

export default RouteDetailPage;
