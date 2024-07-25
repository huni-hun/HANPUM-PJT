package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class AuthenticationCodeInvalidException extends RuntimeException {
    public final ErrorCode errorCode;

    public AuthenticationCodeInvalidException(){
        this.errorCode = ErrorCode.AUTHENTICATION_CODE_INVALID;
    }

    public AuthenticationCodeInvalidException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
