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
    SCHEDULE_DAY_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 세부 일정이 없습니다."),

    /* 경로 */
    COURSE_DETAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 상세정보가 없습니다."),
    COURSE_DAY_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 일차정보가 없습니다."),
    COURSE_REVIEWS_NOT_FOUND(HttpStatus.NOT_FOUND, "조회된 경로 리뷰가 없습니다."),

    /* 인증 */
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다."),
    AUTHENTICATION_MAIL_SEND_FAILED(HttpStatus.BAD_REQUEST, "인증번호 메일 전송에 실패했습니다."),
    AUTHENTICATION_MAIL_TIMEOUT(HttpStatus.REQUEST_TIMEOUT, "인증번호 입력 시간이 초과했습니다."),
    AUTHENTICATION_CODE_INVALID(HttpStatus.BAD_REQUEST, "잘못된 인증번호 입니다."),
    LOGIN_ID_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 아이디입니다."),
    NICKNAME_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 닉네임입니다."),
    LOGIN_ID_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "아이디 검증 시간이 만료되었습니다. 회원가입을 다시 시도해 주세요."),
    EMAIL_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "이메일 검증 시간이 만료되었습니다. 회원가입을 다시 시도해 주세요."),
    EMAIL_NOT_AUTHENTICATED(HttpStatus.BAD_REQUEST, "이메일 인증이 완료되지 않았습니다. 인증을 완료한 후 다시 시도해 주세요."),
    NICKNAME_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "닉네임 검증 시간이 만료되었습니다. 회원가입을 다시 시도해 주세요."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 이메일을 가진 회원을 찾을 수 없습니다."),
    LOGIN_INFO_INVALID(HttpStatus.BAD_REQUEST, "로그인 정보가 잘못되었습니다."),
    TOKEN_INVALID(HttpStatus.BAD_REQUEST, "잘못된 토큰 입니다."),
    TOKEN_BLACKLISTED(HttpStatus.BAD_REQUEST, "다시 로그인해주세요."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.REQUEST_TIMEOUT, "엑세스 토큰이 만료되었습니다."),
    TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "토큰이 존재하지 않습니다."),
    REFRESH_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "리프레쉬 토큰이 존재하지 않습니다. 다시 로그인해 주세요."),
    ACCESS_TOKEN_INVALID(HttpStatus.BAD_REQUEST, "잘못된 엑세스 토큰입니다."),
    ;

    private final HttpStatus status;
    private final String message;
}