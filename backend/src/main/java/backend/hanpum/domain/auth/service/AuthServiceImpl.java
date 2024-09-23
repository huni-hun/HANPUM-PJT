package backend.hanpum.domain.auth.service;

import backend.hanpum.config.s3.S3ImageService;
import backend.hanpum.config.jwt.JwtProvider;
import backend.hanpum.config.redis.RedisDao;
import backend.hanpum.domain.auth.dto.requestDto.*;
import backend.hanpum.domain.auth.dto.responseDto.FindMemberLoginIdResDto;
import backend.hanpum.domain.auth.dto.responseDto.LoginResDto;
import backend.hanpum.domain.auth.dto.responseDto.ReissueAccessTokenResDto;
import backend.hanpum.domain.auth.dto.responseDto.TokenResDto;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.enums.MemberType;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.*;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RedisDao redisDao;
    private final S3ImageService s3ImageService;

    @Override
    @Transactional(readOnly = true)
    public void checkEmailDuplication(String email) {
        memberRepository.findMemberByEmail(email).ifPresent(member -> {
            throw new EmailDuplicatedException();
        });
    }

    @Override
    public void sendEmailAuthCode(SendEmailAuthCodeReqDto sendEmailAuthCodeReqDto) {
        String email = sendEmailAuthCodeReqDto.getEmail();
        checkEmailDuplication(email);
        String authCode = generateAuthCode();
        createAuthMail(email, authCode);
        redisDao.setEmailAuthCode(email, authCode);
    }

    @Override
    public void checkEmailAuthCode(CheckEmailAuthCodeReqDto checkEmailAuthCodeReqDto) {
        String email = checkEmailAuthCodeReqDto.getEmail();
        String inputAuthCode = checkEmailAuthCodeReqDto.getInputAuthCode();
        String storedAuthCode = redisDao.getEmailAuthCode(email);

        if (storedAuthCode == null) {
            throw new AuthenticationMailTimeoutException();
        }
        if (!storedAuthCode.equals(inputAuthCode)) {
            throw new AuthenticationCodeInvalidException();
        }
        redisDao.setAuthenticatedEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public void checkLoginIdDuplication(CheckLoginIdDuplicationReqDto checkLoginIdDuplicationReqDto) {
        String loginId = checkLoginIdDuplicationReqDto.getLoginId();
        memberRepository.findMemberByLoginId(loginId).ifPresent(member -> {
            throw new LoginIdDuplicatedException();
        });
        redisDao.setLoginId(loginId);
    }

    @Override
    @Transactional(readOnly = true)
    public void checkNicknameDuplication(CheckNicknameDuplicationReqDto checkNicknameDuplicationReqDto) {
        String nickname = checkNicknameDuplicationReqDto.getNickname();
        memberRepository.findMemberByNickname(nickname).ifPresent(member -> {
            throw new NicknameDuplicatedException();
        });
        redisDao.setNickName(nickname);
    }

    @Override
    @Transactional
    public void signUp(MultipartFile multipartFile, SignUpReqDto signUpReqDto) {
        checkLoginIdAuthenticated(signUpReqDto.getLoginId());
        checkEmailAuthenticated(signUpReqDto.getEmail());
        checkNicknameAuthenticated(signUpReqDto.getNickname());

        Member member = Member.builder()
                .loginId(signUpReqDto.getLoginId())
                .password((passwordEncoder.encode(signUpReqDto.getPassword())))
                .email(signUpReqDto.getEmail())
                .name(signUpReqDto.getName())
                .birthDate(signUpReqDto.getBirthDate())
                .gender(signUpReqDto.getGender())
                .phoneNumber(signUpReqDto.getPhoneNumber())
                .nickname(signUpReqDto.getNickname())
                .memberType(signUpReqDto.getMemberType())
                .build();

        if(!multipartFile.isEmpty()) {
            member.updateProfilePicture(s3ImageService.uploadImage(multipartFile));
        }
        memberRepository.save(member);

        redisDao.deleteEmail(signUpReqDto.getEmail());
        redisDao.deleteLoginId(signUpReqDto.getLoginId());
        redisDao.deleteNickname(signUpReqDto.getNickname());
    }

    @Override
    @Transactional
    public void kakaoSingUpComplete(Long memberId, MultipartFile multipartFile,
                                    KakaoSignUpCompleteReqDto kakaoSignUpCompleteReqDto) {
        Member member = memberRepository.findByMemberIdAndMemberType(memberId, MemberType.KAKAO_INCOMPLETE)
                .orElseThrow(MemberNotFoundException::new);
        checkNicknameAuthenticated(kakaoSignUpCompleteReqDto.getNickname());
        member.kakaoSingUpComplete(
                kakaoSignUpCompleteReqDto.getName(),
                kakaoSignUpCompleteReqDto.getNickname(),
                kakaoSignUpCompleteReqDto.getGender(),
                kakaoSignUpCompleteReqDto.getBirthDate(),
                kakaoSignUpCompleteReqDto.getPhoneNumber(),
                MemberType.KAKAO
        );
        if (!multipartFile.isEmpty()) {
            member.updateProfilePicture(s3ImageService.uploadImage(multipartFile));
        }
        redisDao.deleteNickname(kakaoSignUpCompleteReqDto.getNickname());
    }

    @Transactional
    @Override
    public LoginResDto login(LoginReqDto loginReqDto) {
        Member member = memberRepository.findMemberByLoginId(loginReqDto.getLoginId())
                .orElseThrow(LoginInfoInvalidException::new);
        if (!passwordEncoder.matches(loginReqDto.getPassword(), member.getPassword())) {
            throw new LoginInfoInvalidException();
        }
        TokenResDto tokenResDto = jwtProvider.createTokenByLogin(member.getLoginId(), member.getMemberType());
        return new LoginResDto(member.getMemberId(), member.getMemberType(), tokenResDto);
    }

    @Override
    public void logout(String accessToken) {
        redisDao.deleteRefreshToken(jwtProvider.getEmailFromJwt(accessToken));
        jwtProvider.addToBlacklist(accessToken);
    }

    @Override
    @Transactional(readOnly = true)
    public ReissueAccessTokenResDto reissueToken(String accessToken) {
        Member member = memberRepository.findMemberByLoginId(jwtProvider.getLoginIdFromExpiredToken(accessToken)).orElseThrow(LoginInfoInvalidException::new);
        return jwtProvider.reissueAccessToken(member.getLoginId(), member.getMemberType());
    }

    @Override
    @Transactional(readOnly = true)
    public FindMemberLoginIdResDto findMemberLoginId(String name, String email) {
        Member member =
                memberRepository.findByEmailAndName(email, name)
                        .orElseThrow(MemberNotFoundException::new);
        return FindMemberLoginIdResDto.builder().loginId(member.getLoginId()).build();
    }
    @Override
    public void sendFindPasswordAuthCode(SendFindPasswordAuthCodeReqDto sendFindPasswordAuthCodeReqDto) {
        String loginId = sendFindPasswordAuthCodeReqDto.getLoginId();
        String email = sendFindPasswordAuthCodeReqDto.getEmail();
        memberRepository.findByLoginIdAndEmail(loginId, email).orElseThrow(MemberNotFoundException::new);
        String authCode = generateAuthCode();
        createFindPasswordMail(email, authCode);
        redisDao.setEmailAuthCode(email, authCode);
    }

    @Override
    @Transactional
    public void passwordReset(FindMemberPasswordReqDto findMemberPasswordReqDto) {
        String email = findMemberPasswordReqDto.getEmail();
        Member member = memberRepository.findMemberByEmail(email).orElseThrow(MemberNotFoundException::new);
        checkEmailAuthenticated(email);
        member.updateMemberPassword(passwordEncoder.encode(findMemberPasswordReqDto.getPassword()));
        redisDao.deleteEmail(email);
    }

    private void checkLoginIdAuthenticated(String loginId) {
        if (!redisDao.hasLoginId(loginId)) {
            throw new LoginIdExpiredException();
        }
    }

    private void checkEmailAuthenticated(String email) {
        if (!redisDao.hasEmail(email)) {
            throw new EmailExpiredException();
        }
        if (!redisDao.checkAuthenticatedEmail(email).equals("Authenticated")) {
            throw new EmailNotAuthenticatedException();
        }
    }

    private void checkNicknameAuthenticated(String nickname) {
        if (!redisDao.hasNickname(nickname)) {
            throw new NicknameExpiredException();
        }
    }

    private String generateAuthCode() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private void createAuthMail(String email, String authCode) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("한품 이메일 인증코드 발송");
            String htmlContent = createAuthMailContent("이메일", authCode);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new AuthenticationMailSendFailedException();
        }
    }

    private void createFindPasswordMail(String email, String authCode) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("한품 비밀번호 찾기 인증코드 발송");
            String htmlContent = createAuthMailContent("비밀번호 찾기", authCode);
            helper.setText(htmlContent, true);
            javaMailSender.send(message);
        } catch (Exception e) {
            throw new AuthenticationMailSendFailedException();
        }
    }

    private String createAuthMailContent(String type, String authCode) {
        return
                "<html>" +
                        "<body style='font-family:Helvetica,Arial,sans-serif;margin:0;padding:0;background-color:#f9f9f9;color:#333;'>" +
                        "  <div style='max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:8px;border:1px solid #e0e0e0;'>" +
                        "    <h1 style='text-align:center;color:#333;'> 한품 " + type + " 인증코드 </h1>" +
                        "    <p style='color:#333;'>안녕하세요.</p>" +
                        "    <p style='color:#333;'>한품 서비스를 이용해 주셔서 감사합니다. 요청하신 인증코드는 아래와 같습니다.</p>" +
                        "    <div style='text-align:center;margin:30px 0;padding:15px;background:#f2f2f2;border-radius:4px;color:#333;border:2px solid #e0e0e0;'>" +
                        "      <h2 style='margin:0;color:#333;'>" + authCode + "</h2>" +
                        "    </div>" +
                        "    <p style='color:#333;'>인증 코드는 5분 동안 유효합니다. 문제가 있을 경우, 고객 지원팀에 문의해 주세요.</p>" +
                        "    <p style='text-align:center;color:#aaa;font-size:12px;border-top:1px solid #e0e0e0;padding-top:20px;'>&copy; 2024 한품. All rights reserved.</p>" +
                        "  </div>" +
                        "</body>" +
                        "</html>";
    }
}