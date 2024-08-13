package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class TemporaryPasswordMailSendFailedException extends RuntimeException {
    public final ErrorCode errorCode;

    public TemporaryPasswordMailSendFailedException(){
        this.errorCode = ErrorCode.TEMPORARY_PASSWORD_MAIL_SEND_FAILED;
    }

    public TemporaryPasswordMailSendFailedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}
