package backend.hanpum.exception.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /* 예시 */
    TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "NOT FOUND 에러 예시용 테스트 코드 입니다."),
    ;

    private final HttpStatus status;
    private final String message;
}