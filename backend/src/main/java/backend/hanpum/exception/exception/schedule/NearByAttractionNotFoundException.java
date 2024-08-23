package backend.hanpum.exception.exception.schedule;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;

@Getter
public class NearByAttractionNotFoundException extends RuntimeException {
    private final ErrorCode errorCode;
    private String errorMessage;

    public NearByAttractionNotFoundException() {
        this.errorCode = ErrorCode.NEARBY_ATTRACTION_NOT_FOUND;
        this.errorMessage = errorCode.getMessage();
    }
}
