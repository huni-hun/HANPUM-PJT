package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.repository.custom.CourseRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long>, CourseRepositoryCustom {
}
