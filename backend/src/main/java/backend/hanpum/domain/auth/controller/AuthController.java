package backend.hanpum.domain.auth.controller;

import backend.hanpum.domain.auth.dto.CheckEmailAuthCodeReqDto;
import backend.hanpum.domain.auth.dto.SendEmailAuthCodeReqDto;
import backend.hanpum.domain.auth.service.AuthService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth 컨트롤러", description = "Auth Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final ApiResponse response;
    private final AuthService authService;

    @Operation(summary = "이메일 인증번호 전송", description = "이메일 인증번호 전송 API")
    @PostMapping("/email-auth")
    public ResponseEntity<?> sendEmailAuthCode(@RequestBody @Valid SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto) {
        authService.sendEmailAuthCode(sendEmailAuthCodeReqDto);
        return response.success(ResponseCode.AUTHENTICATION_MAIL_SEND_SUCCESS);
    }

    @Operation(summary = "이메일 인증번호 전송", description = "이메일 인증번호 전송 API")
    @PostMapping("/email-auth/check")
    public ResponseEntity<?> checkEmailAuthCode(@RequestBody @Valid CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto) {
        authService.checkEmailAuthCode(checkEmailAuthCodeReqDto);
        return response.success(ResponseCode.AUTHENTICATION_SUCCESS);
    }
}