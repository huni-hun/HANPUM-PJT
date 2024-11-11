package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.CourseType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseTypeRepository extends JpaRepository<CourseType, Long> {
    List<CourseType> findByCourse_courseId(Long courseId);
}
