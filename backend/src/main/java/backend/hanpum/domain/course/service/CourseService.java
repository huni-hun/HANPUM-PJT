package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.requestDto.EditCourseReqDto;
import backend.hanpum.domain.course.dto.requestDto.MakeCourseReqDto;
import backend.hanpum.domain.course.dto.requestDto.MultiWaypointSearchReqDto;
import backend.hanpum.domain.course.dto.requestDto.SearchWaypointReqDto;
import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CourseService {
    CourseListMapResDto getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable);
    void makeCourse(Long memberId, MultipartFile multipartFile, MakeCourseReqDto makeCourseReqDto);
    void editCourse(Long memberId, MultipartFile multipartFile, EditCourseReqDto editCourseReqDto);
    void deleteCourse(Long memberId, Long courseId);
    CourseDetailResDto getCourseDetail(Long courseId);
    GetCourseDayResDto getCourseDay(Long courseId, Integer day);
    void addInterestCourse(Long courseId, Long memberId);
    void deleteInterestCourse(Long courseId, Long memberId);
    List<CourseReviewResDto> getCourseReviews(Long courseId, Pageable pageable);
    void writeCourseReview(Long courseId, Long memberId, String content, Double score);
    void editCourseReview(Long reviewId, String content, Double score);
    void deleteCourseReview(Long courseId, Long memberId);
    void addCourseUsageHistory(Long courseId, Long memberId);
    void updateCourseUsageHistory(Long courseId, Long memberId, Double progressRate);
    List<AttractionResDto> searchAttractionsByKeyword(String keyword, Integer contentType);
    List<SearchWaypointResDto> searchWaypointByKeyword(String keyword);
    List<MultiWaypointSearchResDto> searchMultiWaypointCourse(List<MultiWaypointSearchReqDto> multiWaypointSearchReqDtoList);
    List<CourseResDto> getInterestCourseList(Long memberId);
    List<CourseResDto> getSelfMadeCourseList(Long memberId);
    List<UsedCourseResDto> getUsedCourseList(Long memberId);

    // 진행률 계산
    int getScheduleGoalRate(List<ScheduleDayResDto> scheduleDayResDtoList);
}
