package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupMemberNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupMemberNotFoundException(){
        this.errorCode = ErrorCode.GROUP_MEMBER_NOT_FOUND;
    }
}