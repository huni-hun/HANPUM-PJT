package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;

public class CourseReviewsNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public CourseReviewsNotFoundException(){
        this.errorCode = ErrorCode.COURSE_REVIEWS_NOT_FOUND;
    }
}
