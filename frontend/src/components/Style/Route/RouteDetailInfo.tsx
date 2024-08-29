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
import Icon from '@/components/common/Icon/Icon';

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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBsType: React.Dispatch<React.SetStateAction<string>>;
  reviewType: string;
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
                      selected={ele.dayNum === props.selectedDay}
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
                <R.ReviewHeaderTextBox
                  onClick={() => {
                    props.setIsOpen(true);
                    props.setBsType('정렬');
                  }}
                >
                  <R.ReviewHeaderText>{props.reviewType}</R.ReviewHeaderText>
                  <div
                    style={{
                      transform: 'rotate(270deg)',
                      marginLeft: '0.3rem',
                    }}
                  >
                    <Icon name="IconBackArrow" size={10} />
                  </div>
                </R.ReviewHeaderTextBox>
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
                      selected={ele.dayNum === props.selectedDay}
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
