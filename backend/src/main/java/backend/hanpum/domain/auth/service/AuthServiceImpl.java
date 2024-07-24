package backend.hanpum.domain.auth.service;

import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.EmailDuplicatedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final MemberRepository memberRepository;
    private final StringRedisTemplate stringRedisTemplate;

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
}
