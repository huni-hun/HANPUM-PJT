package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupScheduleNotFoundException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public GroupScheduleNotFoundException() {
        this.errorCode = ErrorCode.GROUP_SCHEDULE_NOT_FOUND;
        this.errorMessage = errorCode.getMessage();
    }
}
