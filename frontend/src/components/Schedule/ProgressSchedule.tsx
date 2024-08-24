/** feed 정보 컴포넌트 */
import React from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { FeedInfoProps } from '@/models/route';

const ProgressSchedule = ({
  departuresPlace,
  arrivalsPlace,
  currentDistance,
  totalDistance,
  percentage,
}: FeedInfoProps) => {
  const calculatedPercentage =
    currentDistance && totalDistance
      ? Math.round((currentDistance / totalDistance) * 100)
      : 0;

  const finalPercentage = percentage ?? calculatedPercentage;

  return (
    <>
      <R.RouteDateBox>
        <R.RouteName>1일차 진행 상황을 확인해보세요.</R.RouteName>
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
            <R.Distance>{totalDistance}km</R.Distance>
          </R.DistanceBox>
        </R.StartDateBox>
      </R.RouteDateBox>

      <S.SchduleProgressWrap>
        <R.RouteName>오늘 일정의 달성률</R.RouteName>
        <R.StartDateBox>
          <R.PlaceBox>
            <R.PlaceText>
              출발지 <span className="bold-text">{departuresPlace}</span>
            </R.PlaceText>
            <R.PlaceText>
              도착지 <span className="bold-text">{arrivalsPlace}</span>
            </R.PlaceText>
          </R.PlaceBox>

          <S.PercentBox>
            <S.PercentText>{finalPercentage}%</S.PercentText>
            <S.CalculateDistance>
              {currentDistance ?? 0}km / {totalDistance}km
            </S.CalculateDistance>
          </S.PercentBox>
        </R.StartDateBox>
        <S.ProgressBar percentage={finalPercentage}>
          <div className="progress" />
        </S.ProgressBar>
        <S.ProgressBox>
          <S.ProgressText>
            경유지 <span className="green_text">1</span>/8
          </S.ProgressText>
          <S.ProgressText>
            남은 이동 거리 <span className="bold-text">{totalDistance}km</span>
          </S.ProgressText>
        </S.ProgressBox>
      </S.SchduleProgressWrap>
    </>
  );
};

export default ProgressSchedule;
