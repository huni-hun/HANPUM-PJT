package backend.hanpum.domain.schedule.repository;

import backend.hanpum.domain.schedule.entity.Schedule;
import backend.hanpum.domain.schedule.repository.custom.ScheduleRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> , ScheduleRepositoryCustom {
    void deleteAllByMember_MemberId(Long memberId);
}
