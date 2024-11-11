package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.Attraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttractionRepository extends JpaRepository<Attraction, Long> {
    List<Attraction> findByCourseDay_Course_CourseIdAndCourseDay_dayNumber(Long courseId, Integer day);
}
