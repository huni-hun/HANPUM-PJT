package backend.hanpum.exception.exception.test;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class TestNotFoundException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String errorMessage;

    public TestNotFoundException(ErrorCode errorCode, String errorMessage) {
        this.errorCode = ErrorCode.TEST_NOT_FOUND;
        this.errorMessage = errorMessage;
    }
}
