package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.requestDto.EditCourseReqDto;
import backend.hanpum.domain.course.dto.requestDto.MakeCourseReqDto;
import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.enums.CourseTypes;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CourseService {
    CourseListMapResDto getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable);
    void makeCourse(MakeCourseReqDto makeCourseReqDto);
    void editCourse(EditCourseReqDto editCourseReqDto);
    void deleteCourse(Long memberId, Long courseId);
    CourseDetailResDto getCourseDetail(Long courseId);
    GetCourseDayResDto getCourseDay(Long courseId, Integer day);
    void addInterestCourse(Long courseId, Long memberId);
    void deleteInterestCourse(Long courseId, Long memberId);
    List<CourseReviewResDto> getCourseReviews(Long courseId, Pageable pageable);
    void writeCourseReview(Long courseId, String content, Double score);
    void editCourseReview(Long reviewId, String content, Double score);
    void deleteCourseReview(Long courseId);
    void addCourseUsageHistory(Long courseId, Long memberId);
    void updateCourseUsageHistory(Long courseId, Long memberId, Double progressRate);
}
