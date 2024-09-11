package backend.hanpum.exception.exception.group;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class GroupAlreadyLikeException extends RuntimeException {
    public final ErrorCode errorCode;

    public GroupAlreadyLikeException(){
        this.errorCode = ErrorCode.GROUP_ALREADY_LIKE;
    }
}