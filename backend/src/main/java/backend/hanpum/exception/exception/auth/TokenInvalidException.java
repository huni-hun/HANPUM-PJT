package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class TokenInvalidException extends RuntimeException {
    public final ErrorCode errorCode;

    public TokenInvalidException(){
        this.errorCode = ErrorCode.TOKEN_INVALID;
    }

    public TokenInvalidException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
