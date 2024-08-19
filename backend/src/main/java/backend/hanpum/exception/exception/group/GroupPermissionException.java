package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupPermissionException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupPermissionException(){
        this.errorCode = ErrorCode.GROUP_PERMISSION;
    }
}