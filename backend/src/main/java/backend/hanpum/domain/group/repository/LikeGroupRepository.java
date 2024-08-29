package backend.hanpum.domain.group.repository;

import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.entity.LikeGroup;
import backend.hanpum.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeGroupRepository extends JpaRepository<LikeGroup, Long> {
    void deleteAllByMember_MemberId(Long memberId);
    LikeGroup findByMemberAndGroup(Member member, Group group);
}