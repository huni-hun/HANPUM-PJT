package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.CourseUsageHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseUsageHistoryRepository extends JpaRepository<CourseUsageHistory, Long> {
    CourseUsageHistory findByCourse_courseIdAndMember_memberId(Long courseId, Long memberId);
}
