package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.enums.CourseTypes;

import java.util.List;

public interface CourseService {
    CourseListMapResDto getCourseList(CourseTypes targetCourse);
    CourseDetailResDto getCourseDetail(Long courseId);
    GetCourseDayResDto getCourseDay(Long courseId, Integer day);
    void addInterestCourse(Long courseId, Long memberId);
    void deleteInterestCourse(Long courseId, Long memberId);
    List<CourseReviewResDto> getCourseReviews(Long courseId);
}
