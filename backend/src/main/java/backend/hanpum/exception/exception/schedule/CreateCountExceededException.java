package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class CreateCountExceededException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public CreateCountExceededException() {
        this.errorCode = ErrorCode.CREATE_COUNT_EXCEEDED;
        this.errorMessage = errorCode.getMessage();
    }
}
