package backend.hanpum.domain.course.controller;

import backend.hanpum.domain.course.dto.requestDto.CourseReviewReqDto;
import backend.hanpum.domain.course.dto.requestDto.EditCourseReqDto;
import backend.hanpum.domain.course.dto.requestDto.MakeCourseReqDto;
import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.service.CourseService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Course 컨트롤러", description = "Course Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController {

    private final ApiResponse response;
    private final CourseService courseService;

    @Operation(summary = "경로 목록 조회", description = "경로 목록 조회 API")
    @GetMapping()
    public ResponseEntity<?> getCourseList(@RequestParam CourseTypes targetCourse
//    , Pageable pageable
    ) {
        CourseListMapResDto courseListMapResDto = courseService.getCourseList(targetCourse);

        return response.success(ResponseCode.COURSE_LIST_FETCHED, courseListMapResDto);
    }

    @Operation(summary = "경로 생성", description = "경로 생성 API")
    @PostMapping()
    public ResponseEntity<?> makeCourse(@ModelAttribute MakeCourseReqDto makeCourseReqDto) {
        courseService.makeCourse(makeCourseReqDto);

        return response.success(ResponseCode.COURSE_MAKE_SUCCESS);
    }

    @Operation(summary = "경로 수정", description = "경로 수정 API")
    @PutMapping()
    public ResponseEntity<?> editCourse(@ModelAttribute EditCourseReqDto editCourseReqDto) {
        courseService.editCourse(editCourseReqDto);

        return response.success(ResponseCode.COURSE_EDIT_SUCCESS);
    }

    @Operation(summary = "경로 삭제", description = "경로 삭제 API")
    @DeleteMapping("/{course_id}")
    public ResponseEntity<?> deleteCourse(@PathVariable("course_id") Long courseId) {
         /*
        토큰을 이용해 유저정보 추출하는 부분
        Member member =
        Long memberId = member.getMemberId();
         */

//        courseService.deleteCourse(memberId, courseId);

        return response.success(ResponseCode.COURSE_DELETE_SUCCESS);
    }

    @Operation(summary = "경로 상세 조회", description = "경로 상세 조회 API")
    @GetMapping("/{course_id}")
    public ResponseEntity<?> getCourseDetail(@PathVariable("course_id") Long courseId) {
        CourseDetailResDto courseDetailResDto = courseService.getCourseDetail(courseId);

        return response.success(ResponseCode.COURSE_DETAIL_FETCHED, courseDetailResDto);
    }

    @Operation(summary = "경로 일차 조회", description = "경로 일차 조회 API")
    @GetMapping("/{course_id}/days/{day}")
    public ResponseEntity<?> getCourseDay(@PathVariable("course_id") Long courseId, @PathVariable("day") Integer day) {
        GetCourseDayResDto getCourseDayResDto = courseService.getCourseDay(courseId, day);

        return response.success(ResponseCode.COURSE_DAY_FETCHED, getCourseDayResDto);
    }

    @Operation(summary = "관심 경로 등록", description = "관심 경로 등록 API")
    @GetMapping("{course_id}/like")
    public ResponseEntity<?> addInterestCourse(@PathVariable("course_id") Long courseId) {
        /*
        토큰을 이용해 유저정보 추출하는 부분
        Member member =
        Long memberId = member.getMemberId();
         */

//        courseService.addInterestCourse(courseId, memberId);

        return response.success(ResponseCode.ADD_INTEREST_COURSE_SUCCESS);
    }

    @Operation(summary = "관심 경로 삭제", description = "관심 경로 삭제 API")
    @DeleteMapping("{course_id}/like")
    public ResponseEntity<?> deleteInterestCourse(@PathVariable("course_id") Long courseId) {
        /*
        토큰을 이용해 유저정보 추출하는 부분
        Member member =
        Long memberId = member.getMemberId();
         */

//        courseService.deleteInterestCourse(courseId, memberId);

        return response.success(ResponseCode.DELETE_INTEREST_COURSE_SUCCESS);
    }

    @Operation(summary = "경로 리뷰 조회", description = "경로 리뷰 조회 API")
    @GetMapping("{course_id}/reviews")
    public ResponseEntity<?> getCourseReviews(@PathVariable("course_id") Long courseId) {
        List<CourseReviewResDto> courseReviwes = courseService.getCourseReviews(courseId);

        return response.success(ResponseCode.COURSE_REVIEWS_FETCHED, courseReviwes);
    }

    @Operation(summary = "경로 리뷰 등록", description = "경로 리뷰 등록 API")
    @PostMapping("{course_id}/reviews")
    public ResponseEntity<?> writeCourseReviews(@PathVariable("course_id") Long courseId, @RequestBody CourseReviewReqDto courseReviewReqDto) {
        /*
        토큰을 이용해 유저정보 추출하는 부분
        Member member =
        Long memberId = member.getMemberId();
         */
        String content = courseReviewReqDto.getContent();
        Double score = courseReviewReqDto.getScore();
        courseService.writeCourseReview(courseId, content, score);

        return response.success(ResponseCode.COURSE_REVIEWS_WRITE_SUCCESS);
    }

    @Operation(summary = "경로 리뷰 수정", description = "경로 리뷰 수정 API")
    @PutMapping("{course_id}/reviews")
    public ResponseEntity<?> putCourseReviews(@PathVariable("course_id") Long courseId, @RequestBody CourseReviewReqDto courseReviewReqDto) {
        String content = courseReviewReqDto.getContent();
        Double score = courseReviewReqDto.getScore();
        Long reviewId = courseReviewReqDto.getReviewId();
        courseService.editCourseReview(reviewId, content, score);

        return response.success(ResponseCode.COURSE_REVIEWS_EDIT_SUCCESS);
    }

    @Operation(summary = "경로 리뷰 삭제", description = "경로 리뷰 삭제 API")
    @DeleteMapping("{course_id}/reviews")
    public ResponseEntity<?> deleteCourseReviews(@PathVariable("course_id") Long courseId) {
        /*
        토큰을 이용해 유저정보 추출하는 부분
        Member member =
        Long memberId = member.getMemberId();
         */
        courseService.deleteCourseReview(courseId);

        return response.success(ResponseCode.COURSE_REVIEWS_DELETE_SUCCESS);
    }
}
