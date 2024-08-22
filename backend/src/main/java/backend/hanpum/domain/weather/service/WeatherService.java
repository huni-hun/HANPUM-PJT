package backend.hanpum.domain.weather.service;

import backend.hanpum.domain.weather.dto.WeatherResDto;

public interface WeatherService {
    WeatherResDto getDayWeather(double nx, double ny);
}
