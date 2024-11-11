package backend.hanpum.domain.weather.service;

import backend.hanpum.domain.weather.dto.WeatherResDto;

import java.util.List;

public interface WeatherService {

    List<WeatherResDto> getDayWeather(double lat, double lon);
}
