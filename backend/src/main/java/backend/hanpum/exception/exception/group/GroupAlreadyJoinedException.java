package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupAlreadyJoinedException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupAlreadyJoinedException(){
        this.errorCode = ErrorCode.GROUP_ALREADY_JOINED;
    }
}
