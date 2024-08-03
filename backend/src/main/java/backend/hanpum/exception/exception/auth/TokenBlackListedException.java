package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class TokenBlackListedException extends RuntimeException {
    public final ErrorCode errorCode;

    public TokenBlackListedException(){
        this.errorCode = ErrorCode.TOKEN_BLACKLISTED;
    }

    public TokenBlackListedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
