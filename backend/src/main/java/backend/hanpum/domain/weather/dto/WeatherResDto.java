package backend.hanpum.domain.weather.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherResDto {

    String nowDay;
    String nowTime;
    String nowTemperature;
    String nowWeather;
    String precipitation;
    String precipitationProbability;
}
