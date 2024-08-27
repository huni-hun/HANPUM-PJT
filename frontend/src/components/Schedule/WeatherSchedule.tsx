/** 오늘의 날씨 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { Weather } from '@/models/schdule';

const WeatherSchedule = ({ weatherIcon, logcation, message }: Weather) => {
  return (
    <>
      <S.WeatherContainer>
        <S.WeatherWrap>
          <p>{logcation} 기준</p>
        </S.WeatherWrap>
        <S.EmergenyNotice>
          <img src={weatherIcon} className="weather_img" />
          <p>{message}</p>
        </S.EmergenyNotice>
      </S.WeatherContainer>
    </>
  );
};

export default WeatherSchedule;
