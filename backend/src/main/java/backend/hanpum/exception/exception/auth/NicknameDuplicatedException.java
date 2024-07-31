package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class NicknameDuplicatedException extends RuntimeException {
    public final ErrorCode errorCode;

    public NicknameDuplicatedException(){
        this.errorCode = ErrorCode.NICKNAME_DUPLICATED;
    }

    public NicknameDuplicatedException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}