/** feed 정보 컴포넌트 */
import React from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { FeedInfoProps } from '@/models/route';
import Icon from '@/components/common/Icon/Icon';

const FeedInfo = ({
  feedInfoTitle,
  departuresPlace,
  arrivalsPlace,
  startDate,
  endDate,
  totalDistance,
  dayData,
}: FeedInfoProps) => {
  return (
    <R.RouteDateBox>
      <S.Hr></S.Hr>
      <R.RouteName>{feedInfoTitle}</R.RouteName>
      <R.StartDateBox>
        <R.PlaceBox>
          <R.PlaceText>
            출발지 <span className="bold-text">{departuresPlace}</span>
          </R.PlaceText>
          <R.PlaceText>
            도착지 <span className="bold-text">{arrivalsPlace}</span>
          </R.PlaceText>
        </R.PlaceBox>
        <R.DistanceBox>
          <R.DistanceText>총 이동거리</R.DistanceText>
          <R.Distance>
            <span className="bold-text">{totalDistance}km</span>
          </R.Distance>
        </R.DistanceBox>
      </R.StartDateBox>
      <R.EndDateBox>
        <R.DateBox>
          <R.DateText>
            출발일 <span className="bold-text">{startDate}</span>
          </R.DateText>
          <R.DateText>
            도착일 <span className="bold-text">{endDate}</span>
          </R.DateText>
        </R.DateBox>
        <R.DistanceBox>
          <R.DistanceText>총 일정기간</R.DistanceText>
          <R.Distance>
            <span className="bold-text">
              {dayData?.length > 0
                ? `${dayData[dayData.length - 1].dayNum - 1}박 ${dayData[dayData.length - 1].dayNum} 일`
                : ''}
            </span>
          </R.Distance>
        </R.DistanceBox>
      </R.EndDateBox>
    </R.RouteDateBox>
  );
};

export default FeedInfo;
