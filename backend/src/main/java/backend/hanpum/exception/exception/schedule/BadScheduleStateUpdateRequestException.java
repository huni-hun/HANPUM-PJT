package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class BadScheduleStateUpdateRequestException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public BadScheduleStateUpdateRequestException() {
        this.errorCode = ErrorCode.BAD_SCHEDULE_STATE_UPDATE_REQUEST;
        this.errorMessage = errorCode.getMessage();
    }
}
