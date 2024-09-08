package backend.hanpum.config.jwt;

import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.EmailNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        Member member = memberRepository.findMemberByLoginId(loginId).orElseThrow();
        return new UserDetailsImpl(member);
    }
}