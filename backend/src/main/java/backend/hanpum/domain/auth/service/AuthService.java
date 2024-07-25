package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.CheckEmailAuthCodeReqDto;
import backend.hanpum.domain.auth.dto.SendEmailAuthCodeReqDto;

public interface AuthService {

    void checkEmailDuplication(String email);
    void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto);
    void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto);
}