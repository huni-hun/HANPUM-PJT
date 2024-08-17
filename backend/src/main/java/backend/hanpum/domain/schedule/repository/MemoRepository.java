package backend.hanpum.domain.schedule.repository;

import backend.hanpum.domain.schedule.entity.Memo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemoRepository extends JpaRepository<Memo, Long> {
}
