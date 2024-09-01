package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.entity.CourseUsageHistory;
import backend.hanpum.domain.course.enums.CourseTypes;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {
    Optional<CourseListMapResDto> getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable);
    Optional<CourseDetailResDto> getCourseDetailByCourseId(Long courseId);
    Optional<GetCourseDayResDto> getCourseDayByCourseIdAndDay(Long courseId, Integer day);
    Optional<CourseUsageHistory> getCourseUsageHistory(Long courseId, Long memberId);
}
