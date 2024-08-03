package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class TokenExpiredException extends RuntimeException {
    public final ErrorCode errorCode;

    public TokenExpiredException(){
        this.errorCode = ErrorCode.TOKEN_EXPIRED;
    }

    public TokenExpiredException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
