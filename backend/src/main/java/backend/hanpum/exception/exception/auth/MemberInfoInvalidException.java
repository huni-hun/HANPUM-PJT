package backend.hanpum.exception.exception.auth;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class MemberInfoInvalidException extends RuntimeException {
    private final ErrorCode errorCode;

    public MemberInfoInvalidException() {
        this.errorCode = ErrorCode.MEMBER_INFO_INVALID;
    }

}
