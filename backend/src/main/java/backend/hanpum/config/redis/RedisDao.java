package backend.hanpum.config.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisDao {

    private final RedisTemplate<String, String> redisTemplate;

    private static final String EMAIL_KEY_PREFIX = "email:";
    private static final String LOGIN_ID_KEY_PREFIX = "login_id:";
    private static final String NICKNAME_KEY_PREFIX = "nickname:";
    private static final String AUTHENTICATED = "Authenticated";

    public void setEmailAuthCode(String email, String authCode) {
        redisTemplate.opsForValue().set(EMAIL_KEY_PREFIX + email, authCode, 5, TimeUnit.MINUTES);
    }

    public String getEmailAuthCode(String email) {
        return redisTemplate.opsForValue().get(EMAIL_KEY_PREFIX + email);
    }

    public void setAuthenticatedEmail(String email) {
        redisTemplate.opsForValue().set(EMAIL_KEY_PREFIX + email, AUTHENTICATED, 10, TimeUnit.MINUTES);
    }

    public void setLoginId(String loginId) {
        redisTemplate.opsForValue().set(LOGIN_ID_KEY_PREFIX + loginId, AUTHENTICATED, 10, TimeUnit.MINUTES);
    }

    public void setNickName(String nickname) {
        redisTemplate.opsForValue().set(NICKNAME_KEY_PREFIX + nickname, AUTHENTICATED, 10, TimeUnit.MINUTES);
    }

    public String checkAuthenticatedEmail(String email) {
        return redisTemplate.opsForValue().get(EMAIL_KEY_PREFIX + email);
    }

    public boolean hasEmail(String email) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(EMAIL_KEY_PREFIX + email));
    }

    public boolean hasLoginId(String loginId) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(LOGIN_ID_KEY_PREFIX + loginId));
    }

    public boolean hasNickname(String nickname) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(NICKNAME_KEY_PREFIX + nickname));
    }

    public void deleteEmail(String email) {
        redisTemplate.delete(EMAIL_KEY_PREFIX + email);
    }

    public void deleteLoginId(String loginId) {
        redisTemplate.delete(LOGIN_ID_KEY_PREFIX + loginId);
    }

    public void deleteNickname(String nickname) {
        redisTemplate.delete(NICKNAME_KEY_PREFIX + nickname);
    }

    public void setRefreshToken(String email, String refreshToken, long refreshTokenTime) {
        redisTemplate.opsForValue().set(email, refreshToken, refreshTokenTime, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteRefreshToken(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void setBlackList(String accessToken, String msg, Long minutes) {
        redisTemplate.opsForValue().set(accessToken, msg, minutes, TimeUnit.MILLISECONDS);
    }

    public String getBlackList(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public boolean deleteBlackList(String key) {
        return Boolean.TRUE.equals(redisTemplate.delete(key));
    }
}