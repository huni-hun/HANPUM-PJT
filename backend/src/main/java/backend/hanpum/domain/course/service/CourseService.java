package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;

public interface CourseService {
    CourseDetailResDto getCourseDetail(Long courseId);
    GetCourseDayResDto getCourseDay(Long courseId, Integer day);
//    void addInterestCourse(Long courseId, Long memberId);
    void addInterestCourse(Long courseId);
}
