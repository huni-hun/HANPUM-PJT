package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidDayFormatException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public InvalidDayFormatException(String errorMessage) {
        this.errorCode = ErrorCode.INVALID_DATE_FORMAT;
        this.errorMessage = errorMessage;
    }
}
