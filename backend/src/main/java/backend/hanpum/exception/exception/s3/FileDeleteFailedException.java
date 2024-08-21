package backend.hanpum.exception.exception.s3;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class FileDeleteFailedException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public FileDeleteFailedException() {
        this.errorCode = ErrorCode.FILE_DELETE_FAILED;
        this.errorMessage = errorCode.getMessage();
    }
}
