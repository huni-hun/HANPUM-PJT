package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class ReviewAlreadyExistsException extends RuntimeException {
    public final ErrorCode errorCode;

    public ReviewAlreadyExistsException(){
        this.errorCode = ErrorCode.REVIEW_ALREADY_EXIST;
    }
}
