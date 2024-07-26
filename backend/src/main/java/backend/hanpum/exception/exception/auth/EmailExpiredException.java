package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class EmailExpiredException extends RuntimeException {
    public final ErrorCode errorCode;

    public EmailExpiredException(){
        this.errorCode = ErrorCode.EMAIL_EXPIRED;
    }

    public EmailExpiredException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}