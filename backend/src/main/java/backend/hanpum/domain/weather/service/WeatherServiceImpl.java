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
    public WeatherResDto getDayWeather(double lat, double lon) {

        LocalDateTime now = LocalDateTime.now();

        String baseDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        LocationInfo locationInfo = weatherConverter.convert(lat, lon);
        int nx = locationInfo.getNx();
        int ny = locationInfo.getNy();

        // 현재 시간의 분 값을 가져옵니다.
        int minute = now.getMinute();
        String baseTime;

        if (minute < 45) {
            // 45분 이전이면, 전 시간의 정각 데이터를 사용
            baseTime = now.minusHours(1).withMinute(0).format(DateTimeFormatter.ofPattern("HHmm"));
        } else {
            // 45분 이후이면, 현재 시간의 정각 데이터를 사용
            baseTime = now.withMinute(0).format(DateTimeFormatter.ofPattern("HHmm"));
        }

        String url = new StringBuilder("http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst")
                .append("?serviceKey=").append(serviceKey)
                .append("&pageNo=1")
                .append("&numOfRows=100")
                .append("&dataType=JSON")
                .append("&base_date=").append(baseDate)
                .append("&base_time=").append(baseTime)
                .append("&nx=").append(nx)
                .append("&ny=").append(ny)
                .toString();

        try {
            URI uri = new URI(url);
            System.out.println("key : " + serviceKey);
            System.out.println("url: " + url);
            ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
            System.out.println("응답 : " + response.getBody());
            return parseWeatherResponse(response.getBody());
        } catch (Exception e) {
            throw new WeatherParsingException(e.getMessage());
        }
    }

    private WeatherResDto parseWeatherResponse(String responseBody) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree(responseBody);
            JsonNode responseNode = rootNode.path("response");
            JsonNode bodyNode = responseNode.path("body");
            JsonNode itemsNode = bodyNode.path("items");
            JsonNode itemArray = itemsNode.path("item");

            String closestTime = null;
            String temperature = null;
            String sky = null;
            String pty = null;

            LocalDateTime closestDateTime = null;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");

            // 1. 가장 가까운 시간대를 찾습니다.
            for (JsonNode item : itemArray) {
                String fcstTime = item.path("fcstTime").asText();
                String fcstDate = item.path("fcstDate").asText();

                LocalDateTime forecastDateTime = LocalDateTime.parse(fcstDate + fcstTime, formatter);

                if (closestDateTime == null || forecastDateTime.isBefore(closestDateTime)) {
                    closestDateTime = forecastDateTime;
                    closestTime = fcstTime;
                }
            }

            // 2. 가장 가까운 시간대의 정보들을 추출합니다.
            for (JsonNode item : itemArray) {
                String category = item.path("category").asText();
                String fcstTime = item.path("fcstTime").asText();

                // 3. 가장 가까운 시간대에 해당하는 정보만 처리합니다.
                if (fcstTime.equals(closestTime)) {
                    switch (category) {
                        case "T1H":  // 기온
                            temperature = item.path("fcstValue").asText() + "°C";
                            break;
                        case "SKY":  // 하늘 상태
                            int skyValue = item.path("fcstValue").asInt();
                            sky = getSkyCondition(skyValue);
                            break;
                        case "PTY":  // 강수 형태
                            int ptyValue = item.path("fcstValue").asInt();
                            pty = getPtyCondition(ptyValue);
                            break;
                    }
                }
            }

            WeatherResDto weatherResDto = new WeatherResDto();
            weatherResDto.setReferenceTime(closestTime);
            weatherResDto.setNowTemperature(temperature);
            weatherResDto.setNowWeather(pty != null && !pty.equals("강수 없음") ? pty : sky);  // 강수가 있다면 강수 형태를 우선
            return weatherResDto;
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
