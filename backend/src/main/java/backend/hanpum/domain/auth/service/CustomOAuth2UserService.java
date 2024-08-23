package backend.hanpum.domain.auth.service;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.enums.MemberType;
import backend.hanpum.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        Map<String, Object> oAuth2UserAttributes = super.loadUser(userRequest).getAttributes();
        Member member = getOrSave(oAuth2UserAttributes);
        return new UserDetailsImpl(member, oAuth2UserAttributes);
    }

    private Member getOrSave(Map<String, Object> attributes) {
        String id =  String.valueOf(attributes.get("id"));
        Member member = memberRepository.findMemberByLoginId(id).orElse(null);
        if (member == null) {
            member = Member.builder()
                    .loginId(id)
                    .memberType(MemberType.KAKAO_INCOMPLETE)
                    .build();
            memberRepository.save(member);
            return member;
        }
        return member;
    }
}
