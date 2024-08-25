package backend.hanpum.domain.weather.service;

import backend.hanpum.domain.weather.converter.WeatherConverter;
import backend.hanpum.domain.weather.dto.LocationInfo;
import backend.hanpum.domain.weather.dto.WeatherResDto;
import backend.hanpum.exception.exception.weather.WeatherParsingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class WeatherServiceImpl implements WeatherService {

    private final RestTemplate restTemplate;
    private final WeatherConverter weatherConverter;

    @Value("${weather.api.key}")
    private String serviceKey;

    @Override
    public List<WeatherResDto> getDayWeather(double lat, double lon) {
        LocalDateTime now = LocalDateTime.now();
        String baseDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        LocationInfo locationInfo = weatherConverter.convert(lat, lon);
        int nx = locationInfo.getNx();
        int ny = locationInfo.getNy();
        String baseTime = determineBaseTime(now);

        // URL 생성
        String url = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst")
                .append("?serviceKey=").append(serviceKey)
                .append("&pageNo=1")
                .append("&numOfRows=200")
                .append("&dataType=JSON")
                .append("&base_date=").append(baseDate)
                .append("&base_time=").append(baseTime)
                .append("&nx=").append(nx)
                .append("&ny=").append(ny)
                .toString();

        try {
            URI uri = new URI(url);
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            return parseDayWeatherResponse(response.getBody());
        } catch (Exception e) {
            throw new WeatherParsingException(e.getMessage());
        }
    }

    // 가장 가까운 Base Time을 찾고 필요한 경우 이전 날짜로 조정
    private String determineBaseTime(LocalDateTime now) {
        List<String> baseTimes = List.of("0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300");
        String currentTime = now.format(DateTimeFormatter.ofPattern("HHmm"));
        String baseTime = baseTimes.stream()
                .filter(time -> time.compareTo(currentTime) <= 0)
                .max(String::compareTo)
                .orElse(baseTimes.get(baseTimes.size() - 1));

        LocalDateTime baseDateTime = now.withHour(Integer.parseInt(baseTime.substring(0, 2)))
                .withMinute(Integer.parseInt(baseTime.substring(2)))
                .plusMinutes(10);

        if (now.isBefore(baseDateTime)) {
            int index = baseTimes.indexOf(baseTime);
            if (index == 0) {
                // 가장 첫 번째 base time인 경우, 전날의 마지막 base time으로 설정
                now = now.minusDays(1);
                baseTime = baseTimes.get(baseTimes.size() - 1);
            } else {
                baseTime = baseTimes.get(index - 1);
            }
        }

        return baseTime;
    }

    private List<WeatherResDto> parseDayWeatherResponse(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, WeatherResDto> weatherMap = new TreeMap<>(); // TreeMap을 사용하여 자동 정렬

        try {
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode itemsNode = rootNode.path("response").path("body").path("items").path("item");

            for (JsonNode item : itemsNode) {
                String fcstDate = item.path("fcstDate").asText();
                String fcstTime = item.path("fcstTime").asText();
                String category = item.path("category").asText();
                String fcstValue = item.path("fcstValue").asText();
                String dateTimeKey = fcstDate + fcstTime;

                WeatherResDto weatherResDto = weatherMap.computeIfAbsent(dateTimeKey, k -> new WeatherResDto());
                weatherResDto.setNowDay(fcstDate);
                weatherResDto.setNowTime(fcstTime);

                switch (category) {
                    case "TMP":
                        weatherResDto.setNowTemperature(fcstValue + "°C");
                        break;
                    case "SKY":
                        weatherResDto.setNowWeather(getSkyCondition(Integer.parseInt(fcstValue)));
                        break;
                    case "PTY":
                        String ptyCondition = getPtyCondition(Integer.parseInt(fcstValue));
                        if (!ptyCondition.equals("강수 없음")) {
                            weatherResDto.setNowWeather(ptyCondition);
                        }
                        break;
                    case "RN1":
                    case "PCP":
                        weatherResDto.setPrecipitation(fcstValue + "mm");
                        break;
                }
            }

            return new ArrayList<>(weatherMap.values());
        } catch (Exception e) {
            throw new WeatherParsingException(e.getMessage());
        }
    }

    private String getSkyCondition(int skyValue) {
        switch (skyValue) {
            case 1:
                return "맑음";
            case 3:
                return "구름 많음";
            case 4:
                return "흐림";
            default:
                return "알 수 없음";
        }
    }

    private String getPtyCondition(int ptyValue) {
        switch (ptyValue) {
            case 0:
                return "강수 없음";
            case 1:
                return "비";
            case 2:
                return "비/눈";
            case 3:
                return "눈";
            case 4:
                return "소나기";
            default:
                return "알 수 없음";
        }
    }
}
