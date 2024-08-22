package backend.hanpum.exception.exception.weather;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class WeatherParsingException extends RuntimeException {
    private final ErrorCode errorCode;
    private String message;

    public WeatherParsingException() {
        this.errorCode = ErrorCode.WEATHER_PARSING_EXCEPTION;
    }

    public WeatherParsingException(String message) {
        this.errorCode = ErrorCode.WEATHER_PARSING_EXCEPTION;
        this.message = message;
    }
}
