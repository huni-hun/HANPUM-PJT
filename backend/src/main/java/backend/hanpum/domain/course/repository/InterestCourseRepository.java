package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.InterestCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestCourseRepository extends JpaRepository<InterestCourse, Long> {
    void deleteByMember_MemberIdAndCourse_CourseId(Long memberId, Long courseId);
    List<InterestCourse> findByMember_MemberId(Long memberId);
}
