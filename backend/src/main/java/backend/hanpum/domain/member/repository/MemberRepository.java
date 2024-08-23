package backend.hanpum.domain.member.repository;

import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.enums.MemberType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByEmail(String email);
    Optional<Member> findMemberByLoginId(String loginId);
    Optional<Member> findMemberByNickname(String loginId);
    Optional<Member> findByEmailAndName(String email, String name);
    Optional<Member> findByLoginIdAndEmail(String loginId, String email);
    Optional<Member> findByMemberIdAndMemberType(Long memberId, MemberType memberType);
}