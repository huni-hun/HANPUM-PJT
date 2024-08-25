/** feed 정보 컴포넌트 */
import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { Weather } from '@/models/schdule';

const WeatherSchedule = ({ weatherIcon, message }: Weather) => {
  return (
    <>
      <S.WeatherContainer>
        <S.WeatherWrap>
          <p>경북 경주시 기준</p>
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
