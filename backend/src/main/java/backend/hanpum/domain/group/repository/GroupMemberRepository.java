package backend.hanpum.domain.group.repository;

import backend.hanpum.domain.group.entity.Group;
import backend.hanpum.domain.group.entity.GroupMember;
import backend.hanpum.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
}