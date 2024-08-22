package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.requestDto.*;
import backend.hanpum.domain.auth.dto.responseDto.FindMemberLoginIdResDto;
import backend.hanpum.domain.auth.dto.responseDto.LoginResDto;
import backend.hanpum.domain.auth.dto.responseDto.ReissueAccessTokenResDto;
import org.springframework.web.multipart.MultipartFile;

public interface AuthService {

    void checkEmailDuplication(String email);
    void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto);
    void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto);
    void checkLoginIdDuplication(CheckLoginIdDuplicationReqDto checkLoginIdDuplicationReqDto);
    void checkNicknameDuplication(CheckNicknameDuplicationReqDto checkNicknameDuplicationReqDto);
    void signUp(MultipartFile multipartFile, SignUpReqDto signUpReqDto);
    LoginResDto login(LoginReqDto loginReqDto);
    void logout(String accessToken);
    ReissueAccessTokenResDto reissueToken(String accessToken);
    FindMemberLoginIdResDto findMemberLoginId(FindMemberLoginIdReqDto findMemberPasswordReqDto);
    void findMemberPassword(FindMemberPasswordReqDto findMemberPasswordReqDto);
}