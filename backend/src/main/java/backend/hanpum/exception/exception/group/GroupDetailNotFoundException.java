package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupDetailNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupDetailNotFoundException(){
        this.errorCode = ErrorCode.GROUP_DETAIL_NOT_FOUND;
    }
}