package backend.hanpum.exception.exception.schedule;

import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ScheduleDayNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public ScheduleDayNotFoundException(){
        this.errorCode = ErrorCode.SCHEDULE_DAY_NOT_FOUND;
    }
}
