package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class RefreshTokenNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public RefreshTokenNotFoundException(){
        this.errorCode = ErrorCode.REFRESH_TOKEN_NOT_FOUND;
    }

    public RefreshTokenNotFoundException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}