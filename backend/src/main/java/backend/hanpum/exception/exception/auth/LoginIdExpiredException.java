package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class LoginIdExpiredException extends RuntimeException {
    public final ErrorCode errorCode;

    public LoginIdExpiredException(){
        this.errorCode = ErrorCode.LOGIN_ID_EXPIRED;
    }

    public LoginIdExpiredException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}