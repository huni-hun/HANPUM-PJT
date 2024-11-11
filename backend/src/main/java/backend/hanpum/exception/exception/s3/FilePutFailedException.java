package backend.hanpum.exception.exception.s3;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class FilePutFailedException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public FilePutFailedException() {
        this.errorCode = ErrorCode.FILE_PUT_FAILED;
        this.errorMessage = errorCode.getMessage();
    }
}
