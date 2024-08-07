import React from 'react';
import styled from 'styled-components';
import Icon from '../common/Icon/Icon';
import { colors } from '@/styles/colorPalette';
import * as S from '../Style/Main/Schedule.styled';

function Schedule() {
  const percentage = 68;
  return (
    <S.Container>
      <S.MainScheduleTop>
        <div className="main_schedule-top-left">
          <Icon name="IconInprogress" size={33} />
          <div className="main_schedule-top-left_title">
            <span>
              <span className="main_schedule-top-left_color">동동이님</span>의
            </span>
            <span>진행중인 일정</span>
          </div>
        </div>
        <div className="main_schedule-top-weather">
          <Icon name="IconSun" size={22} />
          <span>18°</span>
        </div>
      </S.MainScheduleTop>

      <div className="line" />

      <S.MainScheduleRoute>
        <div className="route">
          <div className="route_box">
            <div className="route_box-label">출발</div>
            <div className="route_box-place">세종 호수 공원</div>
          </div>

          <div className="route_box">
            <div className="route_box-label">출발</div>
            <div className="route_box-place">세종 호수 공원</div>
          </div>
        </div>

        <div className="route_progress_box">
          <div className="route_progress_box-percent">68%</div>
          <div className="route_progress_box-km">28km / 52km</div>
        </div>
      </S.MainScheduleRoute>

      <S.ProgressBar percentage={percentage}>
        <div className="progress" />
      </S.ProgressBar>

      <div className="map">
        <span>지도사진</span>
      </div>
    </S.Container>
  );
}

export default Schedule;
