package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupDeleteFailedException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupDeleteFailedException(){
        this.errorCode = ErrorCode.GROUP_DELETE_FAILED;
    }
}