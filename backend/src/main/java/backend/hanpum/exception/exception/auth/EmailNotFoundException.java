package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class EmailNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public EmailNotFoundException(){
        this.errorCode = ErrorCode.EMAIL_NOT_FOUND;
    }

    public EmailNotFoundException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}