package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class CourseListNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public CourseListNotFoundException(){
        this.errorCode = ErrorCode.COURSE_LIST_NOT_FOUND;
    }
}
