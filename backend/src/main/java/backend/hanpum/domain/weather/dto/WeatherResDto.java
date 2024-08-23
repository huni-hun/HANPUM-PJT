package backend.hanpum.domain.weather.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WeatherResDto {

    String referenceTime;
    String nowTemperature;
    String nowWeather;
}
