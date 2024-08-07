package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class CourseDayNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public CourseDayNotFoundException(){
        this.errorCode = ErrorCode.COURSE_DAY_NOT_FOUND;
    }
}
