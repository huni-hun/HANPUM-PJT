package backend.hanpum.exception.handler;

import backend.hanpum.exception.exception.course.*;
import backend.hanpum.exception.exception.member.DeleteMemberFailedByGroupException;
import backend.hanpum.exception.exception.s3.FileDeleteFailedException;
import backend.hanpum.exception.exception.s3.FileFormatUnsupportedException;
import backend.hanpum.exception.exception.s3.FilePutFailedException;
import backend.hanpum.exception.exception.auth.*;
import backend.hanpum.exception.exception.common.JsonBadMappingException;
import backend.hanpum.exception.exception.common.JsonBadProcessingException;
import backend.hanpum.exception.exception.common.UriBadSyntaxException;
import backend.hanpum.exception.exception.group.*;
import backend.hanpum.exception.exception.schedule.*;
import backend.hanpum.exception.exception.test.TestNotFoundException;
import backend.hanpum.exception.exception.weather.WeatherParsingException;
import backend.hanpum.exception.format.code.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Log4j2
@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler {

    private final ApiResponse response;

    /* 예시 */
    @ExceptionHandler(TestNotFoundException.class)
    protected ResponseEntity<?> handle(TestNotFoundException e) {
        log.error("TestNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 공통 */
    @ExceptionHandler(JsonBadMappingException.class)
    protected ResponseEntity<?> handle(JsonBadMappingException e) {
        log.error("JsonBadMappingException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(JsonBadProcessingException.class)
    protected ResponseEntity<?> handle(JsonBadProcessingException e) {
        log.error("JsonBadProcessingException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(UriBadSyntaxException.class)
    protected ResponseEntity<?> handle(UriBadSyntaxException e) {
        log.error("UriBadSyntaxException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 경로 */
    @ExceptionHandler(CourseListNotFoundException.class)
    protected ResponseEntity<?> handle(CourseListNotFoundException e) {
        log.error("CourseListNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(CourseNotFoundException.class)
    protected ResponseEntity<?> handle(CourseNotFoundException e) {
        log.error("CourseNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(CourseDayNotFoundException.class)
    protected ResponseEntity<?> handle(CourseDayNotFoundException e) {
        log.error("CourseDayNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(CourseReviewsNotFoundException.class)
    protected ResponseEntity<?> handle(CourseReviewsNotFoundException e) {
        log.error("CourseReviewsNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(ReviewAlreadyExistsException.class)
    protected ResponseEntity<?> handle(ReviewAlreadyExistsException e) {
        log.error("ReviewAlreadyExistsException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(InterestAlreadyExistsException.class)
    protected ResponseEntity<?> handle(InterestAlreadyExistsException e) {
        log.error("InterestAlreadyExistsException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(InterestCourseNotFoundException.class)
    protected ResponseEntity<?> handle(InterestCourseNotFoundException e) {
        log.error("InterestCourseNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 일정 */
    @ExceptionHandler(ScheduleNotFoundException.class)
    protected ResponseEntity<?> handle(ScheduleNotFoundException e) {
        log.error("ScheduleNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupScheduleNotFoundException.class)
    protected ResponseEntity<?> handle(GroupScheduleNotFoundException e) {
        log.error("GroupScheduleNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(ScheduleDayNotFoundException.class)
    protected ResponseEntity<?> handle(ScheduleDayNotFoundException e) {
        log.error("ScheduleDayNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(InvalidDayFormatException.class)
    protected ResponseEntity<?> handle(InvalidDayFormatException e) {
        log.error("InvalidDayFormatException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());

    }

    @ExceptionHandler(ScheduleWayPointNotFoundException.class)
    protected ResponseEntity<?> handle(ScheduleWayPointNotFoundException e) {
        log.error("ScheduleWayPointNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(ValidScheduleNotFoundException.class)
    protected ResponseEntity<?> handle(ValidScheduleNotFoundException e) {
        log.error("ValidScheduleNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(NearByAttractionNotFoundException.class)
    protected ResponseEntity<?> handle(NearByAttractionNotFoundException e) {
        log.error("NearByAttractionNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(BadScheduleStateUpdateRequestException.class)
    protected ResponseEntity<?> handle(BadScheduleStateUpdateRequestException e) {
        log.error("BadScheduleStateUpdateRequestException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(CreateCountExceededException.class)
    protected ResponseEntity<?> handle(CreateCountExceededException e) {
        log.error("CreateCountExceededException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(BadScheduleDateSettingException.class)
    protected ResponseEntity<?> handle(BadScheduleDateSettingException e) {
        log.error("BadScheduleDateSettingException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 날씨 */
    @ExceptionHandler(WeatherParsingException.class)
    protected ResponseEntity<?> handle(WeatherParsingException e) {
        log.error("WeatherParsingException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 모임 */
    @ExceptionHandler(GroupAlreadyJoinedException.class)
    protected ResponseEntity<?> handle(GroupAlreadyJoinedException e) {
        log.error("GroupAlreadyJoinedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupNotFoundException.class)
    protected ResponseEntity<?> handle(GroupNotFoundException e) {
        log.error("GroupNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupMemberNotFoundException.class)
    protected ResponseEntity<?> handle(GroupMemberNotFoundException e) {
        log.error("GroupMemberNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupMemberFullException.class)
    protected ResponseEntity<?> handle(GroupMemberFullException e) {
        log.error("GroupMemberFullException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupPermissionException.class)
    protected ResponseEntity<?> handle(GroupPermissionException e) {
        log.error("GroupPermissionException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupDeleteFailedException.class)
    protected ResponseEntity<?> handle(GroupDeleteFailedException e) {
        log.error("GroupDeleteFailedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupLikeNotFoundException.class)
    protected ResponseEntity<?> handle(GroupLikeNotFoundException e) {
        log.error("GroupLikeNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(GroupAlreadyLikeException.class)
    protected ResponseEntity<?> handle(GroupAlreadyLikeException e) {
        log.error("GroupAlreadyLikeException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 이미지 업로드 */
    @ExceptionHandler(FileFormatUnsupportedException.class)
    protected ResponseEntity<?> handle(FileFormatUnsupportedException e) {
        log.error("FileFormatUnsupportedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(FilePutFailedException.class)
    protected ResponseEntity<?> handle(FilePutFailedException e) {
        log.error("FilePutFailedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(FileDeleteFailedException.class)
    protected ResponseEntity<?> handle(FileDeleteFailedException e) {
        log.error("FileDeleteFailedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 인증 */
    @ExceptionHandler(EmailDuplicatedException.class)
    protected ResponseEntity<?> handle(EmailDuplicatedException e) {
        log.error("EmailDuplicatedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(AuthenticationMailSendFailedException.class)
    protected ResponseEntity<?> handle(AuthenticationMailSendFailedException e) {
        log.error("AuthenticationMailSendFailedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(AuthenticationMailTimeoutException.class)
    protected ResponseEntity<?> handle(AuthenticationMailTimeoutException e) {
        log.error("AuthenticationMailTimeoutException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(AuthenticationCodeInvalidException.class)
    protected ResponseEntity<?> handle(AuthenticationCodeInvalidException e) {
        log.error("AuthenticationCodeInvalidException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(LoginIdDuplicatedException.class)
    protected ResponseEntity<?> handle(LoginIdDuplicatedException e) {
        log.error("LoginIdDuplicatedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(NicknameDuplicatedException.class)
    protected ResponseEntity<?> handle(NicknameDuplicatedException e) {
        log.error("NicknameDuplicatedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(LoginIdExpiredException.class)
    protected ResponseEntity<?> handle(LoginIdExpiredException e) {
        log.error("LoginIdExpiredException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(EmailExpiredException.class)
    protected ResponseEntity<?> handle(EmailExpiredException e) {
        log.error("EmailExpiredException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(NicknameExpiredException.class)
    protected ResponseEntity<?> handle(NicknameExpiredException e) {
        log.error("NicknameExpiredException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(EmailNotAuthenticatedException.class)
    protected ResponseEntity<?> handle(EmailNotAuthenticatedException e) {
        log.error("EmailNotAuthenticatedException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(EmailNotFoundException.class)
    protected ResponseEntity<?> handle(EmailNotFoundException e) {
        log.error("EmailNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(LoginInfoInvalidException.class)
    protected ResponseEntity<?> handle(LoginInfoInvalidException e) {
        log.error("LoginInfoInvalidException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(RefreshTokenNotFoundException.class)
    protected ResponseEntity<?> handle(RefreshTokenNotFoundException e) {
        log.error("RefreshTokenNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(AccessTokenInvalidException.class)
    protected ResponseEntity<?> handle(AccessTokenInvalidException e) {
        log.error("AccessTokenInvalidException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(MemberInfoInvalidException.class)
    protected ResponseEntity<?> handle(MemberInfoInvalidException e) {
        log.error("MemberInfoInvalidException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(MemberNotFoundException.class)
    protected ResponseEntity<?> handle(MemberNotFoundException e) {
        log.error("MemberNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    /* 멤버 */
    @ExceptionHandler(DeleteMemberFailedByGroupException.class)
    protected ResponseEntity<?> handle(DeleteMemberFailedByGroupException e) {
        log.error("DeleteMemberFailedByGroupException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

}