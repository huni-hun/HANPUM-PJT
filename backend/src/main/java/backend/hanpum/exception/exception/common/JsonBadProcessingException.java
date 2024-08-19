package backend.hanpum.exception.exception.common;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class JsonBadProcessingException extends RuntimeException {
    public final ErrorCode errorCode;

    public JsonBadProcessingException(){
        this.errorCode = ErrorCode.JSON_PROCESSING_ERROR;
    }
}
