package backend.hanpum.domain.auth.controller;

import backend.hanpum.config.jwt.JwtProvider;
import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.auth.dto.requestDto.*;
import backend.hanpum.domain.auth.dto.responseDto.LoginResDto;
import backend.hanpum.domain.auth.service.AuthService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Auth 컨트롤러", description = "Auth Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final ApiResponse response;
    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @Operation(summary = "이메일 인증번호 전송", description = "이메일 인증번호 전송 API")
    @PostMapping("/email-auth")
    public ResponseEntity<?> sendEmailAuthCode(@RequestBody @Valid SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto) {
        authService.sendEmailAuthCode(sendEmailAuthCodeReqDto);
        return response.success(ResponseCode.AUTHENTICATION_MAIL_SEND_SUCCESS);
    }

    @Operation(summary = "이메일 인증", description = "이메일 인증 API")
    @PostMapping("/email-auth/check")
    public ResponseEntity<?> checkEmailAuthCode(@RequestBody @Valid CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto) {
        authService.checkEmailAuthCode(checkEmailAuthCodeReqDto);
        return response.success(ResponseCode.AUTHENTICATION_SUCCESS);
    }

    @Operation(summary = "로그인 아이디 중복 검사", description = "로그인 아이디 중복 검사 API")
    @PostMapping("/login-id/check")
    public ResponseEntity<?> checkLoginIdDuplication(@RequestBody @Valid CheckLoginIdDuplicationReqDto checkLoginIdDuplicationReqDto) {
        authService.checkLoginIdDuplication(checkLoginIdDuplicationReqDto);
        return response.success(ResponseCode.LOGIN_ID_CHECK_SUCCESS);
    }

    @Operation(summary = "닉네임 중복 검사", description = "닉네임 중복 검사 API")
    @PostMapping("/nickname/check")
    public ResponseEntity<?> checkNicknameDuplication(@RequestBody @Valid CheckNicknameDuplicationReqDto checkNicknameDuplicationReqDto) {
        authService.checkNicknameDuplication(checkNicknameDuplicationReqDto);
        return response.success(ResponseCode.NICKNAME_CHECK_SUCCESS);
    }

    @Operation(summary = "회원가입", description = "회원가입 API")
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpReqDto signUpReqDto) {
        authService.signUp(signUpReqDto);
        return response.success(ResponseCode.SING_UP_SUCCESS);
    }

    @Operation(summary = "로그인", description = "로그인 API")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginReqDto loginReqDto) {
        LoginResDto loginResDto = authService.login(loginReqDto);
        return response.success(ResponseCode.LOGIN_SUCCESS, loginResDto);
    }

    @Operation(summary = "로그아웃", description = "로그아웃 API")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(@AuthenticationPrincipal UserDetailsImpl userDetails, HttpServletRequest request) {
        authService.logout(jwtProvider.getJwtFromRequest(request));
        return response.success(ResponseCode.LOGOUT_SUCCESS);
    }
}