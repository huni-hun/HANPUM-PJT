package backend.hanpum.domain.test;

import backend.hanpum.domain.weather.dto.WeatherResDto;
import backend.hanpum.domain.weather.service.WeatherService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {
    // BUILD TEST
    
    private final WeatherService weatherService;
    private final ApiResponse apiResponse;

    @GetMapping
    ResponseEntity<?> test() {
        return ResponseEntity.ok("ok9");
    }


    @GetMapping("/day_weather")
    public ResponseEntity<?> dayWeather(@RequestParam double lat, @RequestParam double lon) {
        List<WeatherResDto> result = weatherService.getDayWeather(lat, lon);
        return apiResponse.success(ResponseCode.TEST_SUCCESS, result);
    }
}
