package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;

import java.util.List;
import java.util.Optional;

public interface CourseRepositoryCustom {
    Optional<CourseDetailResDto> getCourseDetailByCourseId(Long courseId);
    Optional<GetCourseDayResDto> getCourseDayByCourseIdAndDay(Long courseId, Integer day);
}
