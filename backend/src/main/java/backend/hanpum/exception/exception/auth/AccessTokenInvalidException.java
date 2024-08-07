package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class AccessTokenInvalidException extends RuntimeException {
    public final ErrorCode errorCode;

    public AccessTokenInvalidException(){
        this.errorCode = ErrorCode.ACCESS_TOKEN_INVALID;
    }

    public AccessTokenInvalidException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}