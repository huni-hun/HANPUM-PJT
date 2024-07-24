package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;

public class CourseNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public CourseNotFoundException(){
        this.errorCode = ErrorCode.COURSE_DETAIL_NOT_FOUND;
    }

    public CourseNotFoundException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }

}
