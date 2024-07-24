package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class EmailDuplicatedException extends RuntimeException {
    public final ErrorCode errorCode;

    public EmailDuplicatedException(){
        this.errorCode = ErrorCode.EMAIL_DUPLICATED;
    }

    public EmailDuplicatedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }

}
