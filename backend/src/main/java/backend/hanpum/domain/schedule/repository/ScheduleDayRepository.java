package backend.hanpum.domain.schedule.repository;

import backend.hanpum.domain.schedule.entity.ScheduleDay;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleDayRepository extends JpaRepository<ScheduleDay, Long> {
}
