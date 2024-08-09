package backend.hanpum.config.jwt;

import backend.hanpum.exception.format.response.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private static final String EXCEPTION_ATTRIBUTE = "exception";
    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = jwtProvider.getJwtFromRequest(request);
        if (jwt != null) {
            handleToken(request, jwt);
        } else {
            request.setAttribute(EXCEPTION_ATTRIBUTE, ErrorCode.TOKEN_NOT_FOUND);
        }
        filterChain.doFilter(request, response);
    }

    private void handleToken(HttpServletRequest request, String jwt) {
        if (jwtProvider.isTokenInBlacklist(jwt)) {
            request.setAttribute(EXCEPTION_ATTRIBUTE, ErrorCode.TOKEN_BLACKLISTED);
            return;
        }
        try {
            if (jwtProvider.validateToken(jwt)) {
                setAuthentication(request, jwt);
            }
        } catch (ExpiredJwtException e) {
            request.setAttribute(EXCEPTION_ATTRIBUTE, ErrorCode.ACCESS_TOKEN_EXPIRED);
        } catch (JwtException e) {
            request.setAttribute(EXCEPTION_ATTRIBUTE, ErrorCode.TOKEN_INVALID);
        }
    }

    private void setAuthentication(HttpServletRequest request, String jwt) {
        String username = jwtProvider.getEmailFromJwt(jwt);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (userDetails != null) {
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}