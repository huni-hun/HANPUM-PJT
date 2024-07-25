package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.CheckEmailAuthCodeReqDto;
import backend.hanpum.domain.auth.dto.SendEmailAuthCodeReqDto;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.AuthenticationCodeInvalidException;
import backend.hanpum.exception.exception.auth.AuthenticationMailSendFailedException;
import backend.hanpum.exception.exception.auth.AuthenticationMailTimeoutException;
import backend.hanpum.exception.exception.auth.EmailDuplicatedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final StringRedisTemplate stringRedisTemplate;
    private final JavaMailSender javaMailSender;

    private static final String EMAIL_KEY_PREFIX = "email:";

    @Override
    @Transactional(readOnly = true)
    public void checkEmailDuplication(String email) {
        memberRepository.findMemberByEmail(email).ifPresent(member -> {
            throw new EmailDuplicatedException();
        });

        if (stringRedisTemplate.hasKey(EMAIL_KEY_PREFIX + email)) {
            throw new EmailDuplicatedException();
        }
    }

    @Override
    public void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto) {
        String email = sendEmailAuthCodeReqDto.getEmail();
        checkEmailDuplication(email);
        String authCode = generateAuthCode();
        createAuthMail(email, authCode);
        stringRedisTemplate.opsForValue().set(EMAIL_KEY_PREFIX + email, authCode, 5, TimeUnit.MINUTES);
    }

    @Override
    public void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto) {
        String email = checkEmailAuthCodeReqDto.getEmail();
        String inputAuthCode = checkEmailAuthCodeReqDto.getInputAuthCode();
        String storedAuthCode = stringRedisTemplate.opsForValue().get(EMAIL_KEY_PREFIX + email);

        if(storedAuthCode == null){
            throw new AuthenticationMailTimeoutException();
        }
        if(!storedAuthCode.equals(inputAuthCode)){
            throw new AuthenticationCodeInvalidException();
        }
        stringRedisTemplate.opsForValue().set(EMAIL_KEY_PREFIX + email, "Authenticated", 10, TimeUnit.MINUTES);
    }

    private String generateAuthCode() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private void createAuthMail(String email, String authCode) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("한품 인증코드 발송");
        message.setText("인증코드 : " + authCode);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            throw new AuthenticationMailSendFailedException();
        }
    }
}