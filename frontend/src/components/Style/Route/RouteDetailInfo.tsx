import { getRouteDayDetail, getRouteReview } from '@/api/route/GET';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import {
  AttractionsProps,
  DaysOfRouteProps,
  RouteDetailDayProps,
  RouteReviewProps,
} from '@/models/route';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '@/components/common/Map/Map';
import RoutePlaceCard from './RoutePlaceCard';
import AttractionsCard from './AttractionsCard';
import ReviewCard from './ReviewCard';
import { Select } from '@mobiscroll/react';

interface RouteDetailInfoProps {
  selected: string;
  selectedDay: number;
  latitude: number;
  longitude: number;
  dayData: RouteDetailDayProps[];
  attractions: AttractionsProps[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  //   reviews: RouteReviewProps[];
  linePath: any[];
}

function RouteDetailInfo(props: RouteDetailInfoProps) {
  const { routeid } = useParams();

  const [dayOfRoute, setDayOfRoute] = useState<DaysOfRouteProps[]>([]);
  const [reviews, setReviews] = useState<RouteReviewProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);

  useEffect(() => {
    getRouteDayDetail(routeid as string, props.selectedDay).then((result) => {
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
  }, [props.selectedDay]);

  useEffect(() => {
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
      setReviewLoading(true);
    });
  }, []);

  const renderMain = () => {
    switch (props.selected) {
      case 'course':
        return (
          <>
            <R.MapBox>
              <Map
                linePath={props.linePath}
                latitude={props.latitude}
                longitude={props.longitude}
              />
            </R.MapBox>
            <R.DetailHeader>
              <R.HeaderOverflow>
                {props.dayData.map((ele) => (
                  <R.DayContainer>
                    <R.DayBox
                      isSelected={ele.dayNum === props.selectedDay}
                      onClick={() => {
                        props.setSelectedDay(ele.dayNum);
                      }}
                    >{`Day ${ele.dayNum}`}</R.DayBox>
                  </R.DayContainer>
                ))}
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {dayOfRoute.length > 0
                  ? dayOfRoute.map((ele) => <RoutePlaceCard {...ele} />)
                  : null}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
      case 'review':
        return (
          <>
            <R.DetailHeader>
              <R.HeaderOverflow>
                {/* <Select
                  list={['최근 수정순', '별점순']}
                  width={20}
                  height={2}
                  radius={0}
                  border=""
                  fontSize={1.5}
                  fontColor="a0a0a0"
                  padding={0}
                  isOpen={true}
                  setOpen={() => {
                    //   setIsOpen(!isOpen);
                  }}
                  onClick={() => {}}
                /> */}
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {reviews.map((ele: RouteReviewProps) => (
                  <ReviewCard {...ele} />
                ))}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
      default:
        return (
          <>
            <R.DetailHeader>
              <R.HeaderOverflow>
                <R.DetailHeaderTitle>주요 관광지</R.DetailHeaderTitle>
              </R.HeaderOverflow>
            </R.DetailHeader>
            <R.DetailMain>
              <R.DetailMainOverflow>
                {props.attractions.map((ele: AttractionsProps) => (
                  <AttractionsCard {...ele} />
                ))}
              </R.DetailMainOverflow>
            </R.DetailMain>
          </>
        );
    }
  };

  return <>{renderMain()}</>;
}

export default RouteDetailInfo;
