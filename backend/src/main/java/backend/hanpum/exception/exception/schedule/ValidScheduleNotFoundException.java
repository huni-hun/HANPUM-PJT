package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ValidScheduleNotFoundException extends RuntimeException {
    private final ErrorCode errorCode;
    private String message;

    public ValidScheduleNotFoundException() {
        this.errorCode = ErrorCode.VALID_SCHEDULE_NOT_FOUND;
    }
}
