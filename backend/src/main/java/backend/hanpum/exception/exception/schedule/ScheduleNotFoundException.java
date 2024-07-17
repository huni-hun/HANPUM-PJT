package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ScheduleNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public ScheduleNotFoundException(){
        this.errorCode = ErrorCode.SCHEDULE_NOT_FOUND;
    }
}
