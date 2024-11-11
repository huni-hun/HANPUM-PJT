package backend.hanpum.exception.exception.member;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class DeleteMemberFailedByGroupException extends RuntimeException {
    public final ErrorCode errorCode;

    public DeleteMemberFailedByGroupException(){
        this.errorCode = ErrorCode.DELETE_MEMBER_FAILED_BY_GROUP;
    }
}