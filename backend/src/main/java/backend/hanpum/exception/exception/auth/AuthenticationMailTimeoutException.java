package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class AuthenticationMailTimeoutException extends RuntimeException {
    public final ErrorCode errorCode;

    public AuthenticationMailTimeoutException(){
        this.errorCode = ErrorCode.AUTHENTICATION_MAIL_TIMEOUT;
    }

    public AuthenticationMailTimeoutException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
