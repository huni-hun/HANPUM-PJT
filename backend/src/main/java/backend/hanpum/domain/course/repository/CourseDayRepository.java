package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.CourseDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseDayRepository extends JpaRepository<CourseDay, Long> {

}
