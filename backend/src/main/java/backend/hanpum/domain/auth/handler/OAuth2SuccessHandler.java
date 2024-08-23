package backend.hanpum.domain.auth.handler;

import backend.hanpum.config.jwt.JwtProvider;
import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.auth.dto.responseDto.TokenResDto;
import backend.hanpum.domain.member.entity.Member;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    @Value("${uri.redirect}")
    private String URI;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Member member = userDetails.getMember();
        TokenResDto tokenResDto = jwtProvider.createTokenByLogin(member.getLoginId(), member.getMemberType());
        response.addCookie(createCookie("accessToken",tokenResDto.getAccessToken()));
        response.addCookie(createCookie("memberId",String.valueOf(member.getMemberId())));
        response.addCookie(createCookie("memberType",String.valueOf(member.getMemberType())));
        response.sendRedirect(URI);
    }

    private static Cookie createCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        //cookie.setHttpOnly(true);
        //cookie.setSecure(true);
        //.sameSite("None")
        return cookie;
    }
}