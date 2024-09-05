import React from 'react';
import * as S from '@/components/Style/Schedule/SchduleMainPage.styled';
import { WeatherProps } from '@/models/schdule';
import SunIcon from '@/assets/icons/weather_sun.svg';
import SunCloudsIcon from '@/assets/icons/weather_sun_clouds.svg';
import RainyIcon from '@/assets/icons/weather_rainy.svg';
import CloudsIcon from '@/assets/icons/weather_clouds.svg';
import PrecipitIcon from '@/assets/icons/precipitation.svg';

interface WeatherScheduleProps {
  logcation?: string;
  weatherData: WeatherProps[];
  weatherIcon?: string;
  message?: string;
}

const WeatherSchedule = ({
  logcation,
  weatherData,
  weatherIcon,
  message,
}: WeatherScheduleProps) => {
  // 현재 시간의 am/pm을 계산하는 함수
  const formatTime = (time: string): { period: string; hourMinute: string } => {
    if (time.length !== 4) return { period: '', hourMinute: time };

    const hour = parseInt(time.substring(0, 2), 10);
    const minute = time.substring(2);
    const period = hour < 12 ? 'AM' : 'PM';
    const formattedHour = hour % 12 || 12;

    return {
      period: period,
      hourMinute: `${formattedHour}:${minute}`,
    };
  };

  // 날씨 상태에 따른 아이콘 선택
  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case '맑음':
        return SunIcon;
      case '흐림':
        return CloudsIcon;
      case '강수':
        return RainyIcon;
      default:
        return SunCloudsIcon;
    }
  };

  const formatPrecipitation = (precipitation: string): string => {
    return precipitation.replace(/(?<=\d)mm$/, '');
  };

  return (
    <S.WeatherContainer>
      <S.WeatherWrap>
        <p className="weather_location">{logcation} 기준</p>
        <S.WeatherContentWrap>
          {weatherData.map((data, index) => {
            const { period, hourMinute } = formatTime(data.nowTime || '');

            return (
              <S.WeatherContent key={index}>
                <p>
                  <span style={{ fontSize: '1rem' }}>{period}</span>
                  <span style={{ fontSize: '1.4rem' }}>{hourMinute}</span>
                </p>
                <p>
                  <img
                    src={getWeatherIcon(data.nowWeather)}
                    alt="Weather icon"
                  />
                </p>
                <p>
                  <span>{data.nowTemperature}</span>
                </p>
                <S.Precipitation>
                  <p className="precipitation">
                    <img src={PrecipitIcon} alt="Precipitation icon" />
                  </p>
                  <p>{formatPrecipitation(data.precipitation || '-')}</p>
                </S.Precipitation>
              </S.WeatherContent>
            );
          })}
        </S.WeatherContentWrap>
      </S.WeatherWrap>
      <S.EmergenyNotice>
        <img src={weatherIcon} className="weather_img" alt="Weather icon" />
        <p>{message}</p>
      </S.EmergenyNotice>
    </S.WeatherContainer>
  );
};

export default WeatherSchedule;
