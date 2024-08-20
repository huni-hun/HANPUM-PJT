package backend.hanpum.exception.exception.s3;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class FileFormatUnsupportedException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public FileFormatUnsupportedException() {
        this.errorCode = ErrorCode.FILE_FORMAT_UNSUPPORTED;
        this.errorMessage = errorCode.getMessage();
    }
}
