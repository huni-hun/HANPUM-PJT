package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;

import java.util.List;

public interface CourseService {
    CourseDetailResDto getCourseDetail(Long courseId);
    GetCourseDayResDto getCourseDay(Long courseId, Integer day);
    void addInterestCourse(Long courseId, Long memberId);
    void deleteInterestCourse(Long courseId, Long memberId);
    List<CourseReviewResDto> getCourseReviews(Long courseId);
    void writeCourseReview(Long courseId, String content, Double score);
    void editCourseReview(Long reviewId, String content, Double score);
}
