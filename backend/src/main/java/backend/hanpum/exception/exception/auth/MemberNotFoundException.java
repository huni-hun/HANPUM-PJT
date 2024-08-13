package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class MemberNotFoundException extends RuntimeException{
    public final ErrorCode errorCode;

    public MemberNotFoundException(){
        this.errorCode = ErrorCode.MEMBER_NOT_FOUND;
    }

    public MemberNotFoundException(ErrorCode errorCode){
        this.errorCode = errorCode;
    }
}