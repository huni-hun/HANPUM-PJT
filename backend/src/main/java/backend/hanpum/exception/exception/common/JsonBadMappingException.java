package backend.hanpum.exception.exception.common;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class JsonBadMappingException extends RuntimeException {
    public final ErrorCode errorCode;

    public JsonBadMappingException(){
        this.errorCode = ErrorCode.JSON_MAPPING_ERROR;
    }
}
