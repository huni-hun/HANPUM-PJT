package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class CourseNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public CourseNotFoundException(){
        this.errorCode = ErrorCode.COURSE_NOT_FOUND;
    }
}
