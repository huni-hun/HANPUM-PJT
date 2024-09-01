package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InterestCourseNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public InterestCourseNotFoundException(){
        this.errorCode = ErrorCode.INTEREST_NOT_FOUND;
    }
}
