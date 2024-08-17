package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ScheduleWayPointNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public ScheduleWayPointNotFoundException() {
        this.errorCode = ErrorCode.SCHEDULE_WAY_POINT_NOT_FOUND;
    }
}
