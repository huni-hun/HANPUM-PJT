package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.requestDto.*;

public interface AuthService {

    void checkEmailDuplication(String email);
    void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto);
    void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto);
    void checkLoginIdDuplication(CheckLoginIdDuplicationReqDto checkLoginIdDuplicationReqDto);
    void checkNicknameDuplication(CheckNicknameDuplicationReqDto checkNicknameDuplicationReqDto);
    void signUp(SignUpReqDto signUpReqDto);
}