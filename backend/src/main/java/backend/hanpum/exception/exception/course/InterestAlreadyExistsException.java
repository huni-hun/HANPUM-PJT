package backend.hanpum.exception.exception.course;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class InterestAlreadyExistsException extends RuntimeException {
    public final ErrorCode errorCode;

    public InterestAlreadyExistsException(){
        this.errorCode = ErrorCode.INTEREST_ALREADY_EXIST;
    }
}
