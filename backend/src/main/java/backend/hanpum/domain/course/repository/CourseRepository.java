package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.Course;
import backend.hanpum.domain.course.repository.custom.CourseRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>, CourseRepositoryCustom {
    Optional<Course> findByMember_MemberIdAndCourseId(Long memberId, Long courseId);
}
