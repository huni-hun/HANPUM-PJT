package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class AuthenticationMailSendFailedException extends RuntimeException {
    public final ErrorCode errorCode;

    public AuthenticationMailSendFailedException(){
        this.errorCode = ErrorCode.AUTHENTICATION_MAIL_SEND_FAILED;
    }

    public AuthenticationMailSendFailedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
