package backend.hanpum.domain.group.repository;

import backend.hanpum.domain.group.entity.Group;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Long> {
    @EntityGraph(attributePaths = {"groupMemberList"})
    @Override
    Optional<Group> findById(Long groupId);
}