package backend.hanpum.config.jwt;

import backend.hanpum.exception.format.response.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SecurityErrorResponse {
    private final String message;
    private final int status;

    public SecurityErrorResponse(ErrorCode errorCode) {
        this.message = errorCode.getMessage();
        this.status = errorCode.getStatus().value();
    }
}