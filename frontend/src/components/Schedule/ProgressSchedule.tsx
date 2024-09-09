/** 내일정 - 진행중 tab 진행상황 + 일정 달성률 */
import React from 'react';
import * as R from '@/components/Style/Route/RouteDetailPage.styled';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { FeedInfoProps } from '@/models/route';

const ProgressSchedule = ({
  /** n일차 진행상황 */
  proceessDay,
  /** 출발, 도착일 */
  departuresPlace,
  arrivalsPlace,
  /** 현재 거리, 전체 거리 계산 */
  totalDuration,
  totalDistance,
  percentage,
  rate,
}: FeedInfoProps) => {
  return (
    <>
      <R.RouteDateBox>
        <R.RouteName>{proceessDay}일차 진행 상황을 확인해보세요.</R.RouteName>
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
      </R.RouteDateBox>

      <S.SchduleProgressWrap isScheduleHeight>
        <S.Hr></S.Hr>
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
            <S.PercentText>{percentage}%</S.PercentText>
            {/* <S.CalculateDistance>
              {totalDuration}km / {totalDistance}km
            </S.CalculateDistance> */}
          </S.PercentBox>
        </R.StartDateBox>
        <S.ProgressBar percentage={percentage || 0}>
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
