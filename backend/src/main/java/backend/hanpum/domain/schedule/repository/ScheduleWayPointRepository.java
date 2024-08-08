package backend.hanpum.domain.schedule.repository;

import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleWayPointRepository extends JpaRepository<ScheduleWayPoint, Long> {
}
