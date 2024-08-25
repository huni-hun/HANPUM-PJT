package backend.hanpum.domain.weather;

import backend.hanpum.domain.weather.dto.WeatherResDto;
import backend.hanpum.domain.weather.service.WeatherService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Weather 컨트롤러", description = "Weather Controller API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final ApiResponse response;
    private final WeatherService weatherService;

    @Operation(summary = "날씨 조회", description = "현재 시각 이후 날씨 조회")
    @GetMapping
    ResponseEntity<?> getDayWeather(@RequestParam double lat,
                                    @RequestParam double lon) {
        List<WeatherResDto> result = weatherService.getDayWeather(lat, lon);
        return response.success(ResponseCode.WEATHER_LIST_FETCHED, result);
    }
}
