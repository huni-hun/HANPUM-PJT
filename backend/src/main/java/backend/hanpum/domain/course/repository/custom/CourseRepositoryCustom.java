package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.enums.CourseTypes;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {
    Optional<CourseListMapResDto> getCourseList(CourseTypes targetCourse, Pageable pageable);
    Optional<CourseDetailResDto> getCourseDetailByCourseId(Long courseId);
    Optional<GetCourseDayResDto> getCourseDayByCourseIdAndDay(Long courseId, Integer day);
}
