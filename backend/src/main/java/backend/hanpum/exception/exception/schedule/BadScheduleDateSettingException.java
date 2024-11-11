package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class BadScheduleDateSettingException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public BadScheduleDateSettingException() {
        this.errorCode = ErrorCode.BAD_SCHEDULE_DATE_SETTING;
        this.errorMessage = errorCode.getMessage();
    }
}
