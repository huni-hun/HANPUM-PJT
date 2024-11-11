package backend.hanpum.domain.course.repository;

import backend.hanpum.domain.course.entity.InterestCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestCourseRepository extends JpaRepository<InterestCourse, Long> {
    Optional<InterestCourse> findByMember_MemberIdAndCourse_CourseId(Long memberId, Long courseId);
    void deleteByMember_MemberIdAndCourse_CourseId(Long memberId, Long courseId);
    List<InterestCourse> findByMember_MemberId(Long memberId);
    void deleteAllByMember_MemberId(Long memberId);
}
