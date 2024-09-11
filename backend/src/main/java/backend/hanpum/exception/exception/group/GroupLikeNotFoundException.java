package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupLikeNotFoundException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupLikeNotFoundException(){
        this.errorCode = ErrorCode.GROUP_LIKE_NOT_FOUND;
    }
}