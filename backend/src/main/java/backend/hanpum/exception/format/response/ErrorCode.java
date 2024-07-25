package backend.hanpum.exception.format.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    /* 예시 */
    TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "NOT FOUND 에러 예시용 테스트 코드 입니다."),

    /* 일정 */
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 일정이 없습니다."),

    /* 경로 */
    COURSE_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 상세정보가 없습니다."),
    COURSE_DAY_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 일차정보가 없습니다."),

    /* 인증 */
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다."),
    AUTHENTICATION_MAIL_SEND_FAILED(HttpStatus.BAD_REQUEST, "인증번호 메일 전송에 실패했습니다.")
    ;

    private final HttpStatus status;
    private final String message;
}