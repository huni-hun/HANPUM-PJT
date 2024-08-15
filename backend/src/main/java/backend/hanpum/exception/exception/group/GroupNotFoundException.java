package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupNotFoundException(){
        this.errorCode = ErrorCode.GROUP_NOT_FOUND;
    }
}