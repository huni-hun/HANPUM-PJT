package backend.hanpum.domain.group.repository;

import backend.hanpum.domain.group.entity.GroupMember;
import backend.hanpum.domain.group.enums.JoinType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
    GroupMember findByGroup_GroupIdAndJoinType(Long groupId, JoinType joinType);
}