package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class EmailNotAuthenticatedException extends RuntimeException {
    public final ErrorCode errorCode;

    public EmailNotAuthenticatedException(){
        this.errorCode = ErrorCode.EMAIL_NOT_AUTHENTICATED;
    }

    public EmailNotAuthenticatedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}