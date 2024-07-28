package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class NicknameExpiredException extends RuntimeException {
    public final ErrorCode errorCode;

    public NicknameExpiredException(){
        this.errorCode = ErrorCode.NICKNAME_EXPIRED;
    }

    public NicknameExpiredException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}