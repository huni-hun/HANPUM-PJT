package backend.hanpum.exception.handler;

import backend.hanpum.exception.exception.auth.*;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleNotFoundException;
import backend.hanpum.exception.exception.test.TestNotFoundException;
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

    /* 일정 */
    @ExceptionHandler(ScheduleNotFoundException.class)
    protected ResponseEntity<?> handle(ScheduleNotFoundException e) {
        log.error("ScheduleNotFoundException = {}", e.getErrorCode().getMessage());
        log.error("Error Message = {}", e.getMessage());
        return response.error(e.getErrorCode());
    }

    @ExceptionHandler(ScheduleDayNotFoundException.class)
    protected ResponseEntity<?> handle(ScheduleDayNotFoundException e) {
        log.error("ScheduleDayNotFoundException = {}", e.getErrorCode().getMessage());
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
}