package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.auth.dto.requestDto.*;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.*;
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
    private static final String LOGIN_ID_KEY_PREFIX = "login_id:";
    private static final String NICKNAME_KEY_PREFIX = "nickname:";

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

    @Override
    @Transactional(readOnly = true)
    public void checkLoginIdDuplication(CheckLoginIdDuplicationReqDto checkLoginIdDuplicationReqDto) {
        String loginId = checkLoginIdDuplicationReqDto.getLoginId();
        memberRepository.findMemberByLoginId(loginId).ifPresent(member -> {
            throw new LoginIdDuplicatedException();
        });
        if (stringRedisTemplate.hasKey(LOGIN_ID_KEY_PREFIX + loginId)) {
            throw new LoginIdDuplicatedException();
        }
        stringRedisTemplate.opsForValue().set(LOGIN_ID_KEY_PREFIX + loginId, "Authenticated", 10, TimeUnit.MINUTES);
    }

    @Override
    @Transactional(readOnly = true)
    public void checkNicknameDuplication(CheckNicknameDuplicationReqDto checkNicknameDuplicationReqDto) {
        String nickname = checkNicknameDuplicationReqDto.getNickname();
        memberRepository.findMemberByNickname(nickname).ifPresent(member -> {
            throw new NicknameDuplicatedException();
        });
        if (stringRedisTemplate.hasKey(NICKNAME_KEY_PREFIX + nickname)) {
            throw new NicknameDuplicatedException();
        }
        stringRedisTemplate.opsForValue().set(NICKNAME_KEY_PREFIX + nickname, "Authenticated", 10, TimeUnit.MINUTES);
    }

    @Override
    @Transactional
    public void signUp(SignUpReqDto signUpReqDto) {
        checkLoginIdAuthenticated(signUpReqDto.getLoginId());
        checkEmailAuthenticated(signUpReqDto.getEmail());
        checkNicknameAuthenticated(signUpReqDto.getNickname());

        Member member = Member.builder()
                .loginId(signUpReqDto.getLoginId())
                .password(signUpReqDto.getPassword())
                .email(signUpReqDto.getEmail())
                .profilePicture(signUpReqDto.getProfilePicture())
                .name(signUpReqDto.getName())
                .birthDate(signUpReqDto.getBirthDate())
                .gender(signUpReqDto.getGender())
                .phoneNumber(signUpReqDto.getPhoneNumber())
                .nickname(signUpReqDto.getNickname())
                .memberType(signUpReqDto.getMemberType())
                .build();
        memberRepository.save(member);

        stringRedisTemplate.delete(EMAIL_KEY_PREFIX + signUpReqDto.getEmail());
        stringRedisTemplate.delete(LOGIN_ID_KEY_PREFIX + signUpReqDto.getLoginId());
        stringRedisTemplate.delete(NICKNAME_KEY_PREFIX + signUpReqDto.getNickname());
    }

    private void checkLoginIdAuthenticated(String loginId){
        if (!stringRedisTemplate.hasKey(LOGIN_ID_KEY_PREFIX + loginId)) {
            throw new LoginIdExpiredException();
        }
    }

    private void checkEmailAuthenticated(String email){
        if (!stringRedisTemplate.hasKey(EMAIL_KEY_PREFIX + email)) {
            throw new EmailExpiredException();
        }
        if (!stringRedisTemplate.opsForValue().get(EMAIL_KEY_PREFIX + email).equals("Authenticated")) {
            throw new EmailNotAuthenticatedException();
        }
    }

    private void checkNicknameAuthenticated(String nickname){
        if (!stringRedisTemplate.hasKey(NICKNAME_KEY_PREFIX + nickname)) {
            throw new NicknameExpiredException();
        }
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