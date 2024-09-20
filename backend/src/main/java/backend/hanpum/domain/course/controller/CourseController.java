package backend.hanpum.domain.course.controller;

import backend.hanpum.config.jwt.UserDetailsImpl;
import backend.hanpum.domain.auth.dto.requestDto.KakaoSignUpCompleteReqDto;
import backend.hanpum.domain.course.dto.requestDto.*;
import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.service.CourseService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<?> getCourseList(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                           @RequestParam(required = false) CourseTypes targetCourse,
                                           @RequestParam(required = false) Double maxDistance,
                                           @RequestParam(required = false) Integer maxDays,
                                           @RequestParam(required = false) List<CourseTypes> selectedTypes,
                                           @RequestParam(required = false) String keyword,
                                           Pageable pageable) {
        Long memberId = null;
        if(userDetails != null) {
            memberId = userDetails.getMember().getMemberId();
        }

        CourseListMapResDto courseListMapResDto = courseService.getCourseList(targetCourse, maxDistance, maxDays, selectedTypes, keyword, pageable, memberId);
        return response.success(ResponseCode.COURSE_LIST_FETCHED, courseListMapResDto);
    }

    @Operation(summary = "경로 생성", description = "경로 생성 API")
    @PostMapping()
    public ResponseEntity<?> makeCourse(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @RequestPart(required = false) MultipartFile multipartFile,
                                        @RequestPart MakeCourseReqDto makeCourseReqDto) {
        courseService.makeCourse(userDetails.getMember().getMemberId(), multipartFile, makeCourseReqDto);

        return response.success(ResponseCode.COURSE_MAKE_SUCCESS);
    }

    @Operation(summary = "경로 수정", description = "경로 수정 API")
    @PutMapping()
    public ResponseEntity<?> editCourse(@AuthenticationPrincipal UserDetailsImpl userDetails,
                                        @RequestPart(required = false) MultipartFile multipartFile,
                                        @RequestPart EditCourseReqDto editCourseReqDto) {
        courseService.editCourse(userDetails.getMember().getMemberId(), multipartFile, editCourseReqDto);

        return response.success(ResponseCode.COURSE_EDIT_SUCCESS);
    }

    @Operation(summary = "경로 공개여부 수정", description = "경로 공개여부 수정 API")
    @PutMapping("/{course_id}/changeOpen")
    public ResponseEntity<?> editCourse(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId) {
        courseService.editCourseOpenState(userDetails.getMember().getMemberId(), courseId);

        return response.success(ResponseCode.COURSE_EDIT_OPEN_STATE_SUCCESS);
    }

    @Operation(summary = "경로 삭제", description = "경로 삭제 API")
    @DeleteMapping("/{course_id}")
    public ResponseEntity<?> deleteCourse(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId) {
        courseService.deleteCourse(userDetails.getMember().getMemberId(), courseId);

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

    @Operation(summary = "경로 일차 관광지 조회", description = "경로 일차 관광지 조회 API")
    @GetMapping("/{course_id}/days/{day}/attract")
    public ResponseEntity<?> getCourseDayAttractions(@PathVariable("course_id") Long courseId, @PathVariable("day") Integer day) {
        List<AttractionResDto> getAttractionResDtoList = courseService.getCourseDayAttractions(courseId, day);

        return response.success(ResponseCode.COURSE_DAY_ATTRACTION_FETCHED, getAttractionResDtoList);
    }

    @Operation(summary = "관심 경로 등록", description = "관심 경로 등록 API")
    @GetMapping("{course_id}/like")
    public ResponseEntity<?> addInterestCourse(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId) {
        courseService.addInterestCourse(courseId, userDetails.getMember().getMemberId());

        return response.success(ResponseCode.ADD_INTEREST_COURSE_SUCCESS);
    }

    @Operation(summary = "관심 경로 삭제", description = "관심 경로 삭제 API")
    @DeleteMapping("{course_id}/like")
    public ResponseEntity<?> deleteInterestCourse(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId) {
        courseService.deleteInterestCourse(courseId, userDetails.getMember().getMemberId());

        return response.success(ResponseCode.DELETE_INTEREST_COURSE_SUCCESS);
    }

    @Operation(summary = "경로 리뷰 조회", description = "경로 리뷰 조회 API")
    @GetMapping("{course_id}/reviews")
    public ResponseEntity<?> getCourseReviews(@PathVariable("course_id") Long courseId, Pageable pageable) {
        List<CourseReviewResDto> courseReviwes = courseService.getCourseReviews(courseId, pageable);

        return response.success(ResponseCode.COURSE_REVIEWS_FETCHED, courseReviwes);
    }

    @Operation(summary = "경로 리뷰 등록", description = "경로 리뷰 등록 API")
    @PostMapping("{course_id}/reviews")
    public ResponseEntity<?> writeCourseReviews(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId, @RequestBody CourseReviewReqDto courseReviewReqDto) {
        String content = courseReviewReqDto.getContent();
        Double score = courseReviewReqDto.getScore();
        courseService.writeCourseReview(courseId, userDetails.getMember().getMemberId(), content, score);

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
    public ResponseEntity<?> deleteCourseReviews(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable("course_id") Long courseId) {
        courseService.deleteCourseReview(courseId, userDetails.getMember().getMemberId());

        return response.success(ResponseCode.COURSE_REVIEWS_DELETE_SUCCESS);
    }

    @Operation(summary = "경로생성 관광지 조회", description = "경로생성 관광지 조회 API")
    @PostMapping("/search/attraction")
    public ResponseEntity<?> searchAttractionList(@RequestBody SearchAttractionReqDto searchAttractionReqDto) {
        List<AttractionResDto> attractionResDtoList = courseService.searchAttractionsByKeyword(searchAttractionReqDto.getKeyword(), searchAttractionReqDto.getContentTypeId());

        return response.success(ResponseCode.SEARCH_ATTRACTION_RESTAPI_SUCCESS, attractionResDtoList);
    }

    @Operation(summary = "경로생성 경유지 조회", description = "경로생성 경유지 조회 API")
    @PostMapping("/search/waypoint")
    public ResponseEntity<?> searchWaypoint(@RequestBody SearchWaypointReqDto searchWaypointReqDto) {
        List<SearchWaypointResDto> searchWaypointResDto = courseService.searchWaypointByKeyword(searchWaypointReqDto.getKeyword());

        return response.success(ResponseCode.SEARCH_WAYPOINT_RESTAPI_SUCCESS, searchWaypointResDto);
    }

    @Operation(summary = "다중 경유지 경로 조회", description = "다중 경유지 경로 조회 API")
    @PostMapping("/search/multiWaypoint")
    public ResponseEntity<?> searchMultiWaypointCourse(@RequestBody List<MultiWaypointSearchReqDto> multiWaypointSearchReqDtoList) {
        List<MultiWaypointSearchResDto> multiWaypointSearchResDtoList = courseService.searchMultiWaypointCourse(multiWaypointSearchReqDtoList);

        return response.success(ResponseCode.SEARCH_MULTI_WAYPOINT_COURSE_RESTAPI_SUCCESS, multiWaypointSearchResDtoList);
    }

    @Operation(summary = "티맵 보행자 다중 경유지 경로 조회", description = "티맵 보행자 다중 경유지 경로 조회 API")
    @PostMapping("/search/tmapMulti")
    public ResponseEntity<?> searchTmapMultiWaypoint(@AuthenticationPrincipal UserDetailsImpl userDetails, @RequestBody List<MultiWaypointSearchReqDto> multiWaypointSearchReqDtoList) {
        List<MultiWaypointSearchResDto> multiWaypointSearchResDtoList = courseService.getSearchTmapMultiWaypoint(multiWaypointSearchReqDtoList);

        return response.success(ResponseCode.SEARCH_TMAP_MULTI_WAYPOINT_COURSE_RESTAPI_SUCCESS, multiWaypointSearchResDtoList);
    }
}
