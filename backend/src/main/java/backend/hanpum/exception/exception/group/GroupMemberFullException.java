package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupMemberFullException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupMemberFullException(){
        this.errorCode = ErrorCode.GROUP_MEMBER_FULL;
    }
}