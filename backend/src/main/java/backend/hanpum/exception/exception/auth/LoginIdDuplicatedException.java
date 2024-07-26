package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class LoginIdDuplicatedException extends RuntimeException {
    public final ErrorCode errorCode;

    public LoginIdDuplicatedException(){
        this.errorCode = ErrorCode.LOGIN_ID_DUPLICATED;
    }

    public LoginIdDuplicatedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}