package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class LoginInfoInvalidException extends RuntimeException {
    public final ErrorCode errorCode;

    public LoginInfoInvalidException(){
        this.errorCode = ErrorCode.LOGIN_INFO_INVALID;
    }

    public LoginInfoInvalidException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}