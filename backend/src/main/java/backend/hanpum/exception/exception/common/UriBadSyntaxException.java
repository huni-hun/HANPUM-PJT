package backend.hanpum.exception.exception.common;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class UriBadSyntaxException extends RuntimeException {
    public final ErrorCode errorCode;

    public UriBadSyntaxException(){
        this.errorCode = ErrorCode.URI_SYNTAX_ERROR;
    }
}
