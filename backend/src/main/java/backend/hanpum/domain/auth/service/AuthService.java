package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.requestDto.CheckEmailAuthCodeReqDto;
import backend.hanpum.domain.auth.dto.requestDto.SendEmailAuthCodeReqDto;

public interface AuthService {

    void checkEmailDuplication(String email);
    void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto);
    void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto);
}