package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.requestDto.AttractionReqDto;
import backend.hanpum.domain.course.dto.requestDto.CourseDayReqDto;
import backend.hanpum.domain.course.dto.requestDto.MakeCourseReqDto;
import backend.hanpum.domain.course.dto.requestDto.WayPointReqDto;
import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.repository.*;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.MemberInfoInvalidException;
import backend.hanpum.exception.exception.course.CourseDayNotFoundException;
import backend.hanpum.exception.exception.course.CourseListNotFoundException;
import backend.hanpum.exception.exception.course.CourseNotFoundException;
import backend.hanpum.exception.exception.course.CourseReviewsNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final CourseTypeRepository courseTypeRepository;
    private final InterestCourseRepository interestCourseRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final CourseDayRepository courseDayRepository;
    private final AttractionRepository attractionRepository;
    private final WaypointRepository waypointRepository;

    @Override
    @Transactional(readOnly = true)
    public CourseListMapResDto getCourseList(CourseTypes targetCourse) {
        CourseListMapResDto courseListMapResDto = courseRepository.getCourseList(targetCourse).orElseThrow(CourseListNotFoundException::new);

        return courseListMapResDto;
    }

    @Override
    @Transactional
    public void makeCourse(MakeCourseReqDto makeCourseReqDto) {

        Date currentDate = new Date();
        Course course = Course.builder()
                .courseName(makeCourseReqDto.getCourseName())
                .content(makeCourseReqDto.getContent())
                .openState(makeCourseReqDto.isOpenState())
                .writeState(makeCourseReqDto.isWriteState())
                .writeDate(currentDate)
                .member(memberRepository.findById(makeCourseReqDto.getMemberId()).orElseThrow())  // 토큰으로 멤버정보 찾도록. 추후 변경
                .backgroundImg("TEMP") // S3 미생성. 이미지 업로드 미구현. 추후 변경
                .build();
        courseRepository.save(course);

        for (String courseTypeName : makeCourseReqDto.getCourseTypeList()) {
            CourseType courseType = CourseType.builder()
                    .course(course)
                    .typeName(CourseTypes.valueOf(courseTypeName))
                    .build();

            courseTypeRepository.save(courseType);
        }

        for (CourseDayReqDto courseDayReqDto : makeCourseReqDto.getCourseDayReqDtoList()) {
            Double totalDistance = 0.0;
            Double totalDuration = 0.0;
            Double totalCalorie = 0.0;
            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                        totalDistance += Double.parseDouble(waypointReqDto.getDistance());
                        totalDuration += Double.parseDouble(waypointReqDto.getDuration());
                        totalCalorie += Double.parseDouble(waypointReqDto.getCalorie());
            }

            CourseDay courseDay = CourseDay.builder()
                    .course(course)
                    .dayNumber(courseDayReqDto.getDayNumber())
                    .totalDistance(String.format("%.1f", totalDistance))
                    .totalDuration(String.format("%.1f", totalDuration))
                    .totalCalorie(String.format("%.1f", totalCalorie))
                    .build();
            courseDayRepository.save(courseDay);

            for (AttractionReqDto attractionReqDto : courseDayReqDto.getAttractionReqDtoList()) {
                Attraction attraction = Attraction.builder()
                        .courseDay(courseDay)
                        .name(attractionReqDto.getName())
                        .type(attractionReqDto.getType())
                        .address(attractionReqDto.getAddress())
                        .lat(attractionReqDto.getLat())
                        .lon(attractionReqDto.getLon())
                        .img("TEMP") // S3 미생성. 이미지 업로드 미구현. 추후 변경
                        .build();
                attractionRepository.save(attraction);
            }

            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                Waypoint waypoint = Waypoint.builder()
                        .courseDay(courseDay)
                        .type(waypointReqDto.getType())
                        .name(waypointReqDto.getName())
                        .address(waypointReqDto.getAddress())
                        .lat(waypointReqDto.getLat())
                        .lon(waypointReqDto.getLon())
                        .pointNumber(waypointReqDto.getPointNumber())
                        .distance(waypointReqDto.getDistance())
                        .duration(waypointReqDto.getDuration())
                        .calorie(waypointReqDto.getCalorie())
                        .build();
                waypointRepository.save(waypoint);
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public CourseDetailResDto getCourseDetail(Long courseId) {
        CourseDetailResDto courseDetailResDto = courseRepository.getCourseDetailByCourseId(courseId).orElseThrow(CourseNotFoundException::new);
        return courseDetailResDto;
    }

    @Override
    @Transactional(readOnly = true)
    public GetCourseDayResDto getCourseDay(Long courseId, Integer day) {
        GetCourseDayResDto getCourseDayResDto = courseRepository.getCourseDayByCourseIdAndDay(courseId, day).orElseThrow(CourseDayNotFoundException::new);
        return getCourseDayResDto;
    }

    @Override
    @Transactional
    public void addInterestCourse(Long courseId, Long memberId) {
//        Member member = memberRepository.findByMemberId(memberId).orElse(null);
        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
        InterestCourse interestCourse = InterestCourse.builder()
//                .member(member)
                .course(course)
                .build();

        interestCourseRepository.save(interestCourse);
    }

    @Override
    @Transactional
    public void deleteInterestCourse(Long courseId, Long memberId) {
        interestCourseRepository.deleteByMember_MemberIdAndCourse_CourseId(courseId, memberId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseReviewResDto> getCourseReviews(Long courseId) {
        List<CourseReviewResDto> courseReviewResDtoList = new ArrayList<>();
        List<Review> ReviewList = reviewRepository.findByCourse_CourseId(courseId);

        if(ReviewList.isEmpty()) {
            throw new CourseReviewsNotFoundException();
        } else {
            for(Review review : ReviewList) {
                CourseReviewResDto courseReviewResDto = CourseReviewResDto.builder()
                        .memberId(review.getMember().getMemberId())
                        .courseId(review.getCourse().getCourseId())
                        .content(review.getContent())
                        .score(review.getScore())
                        .writeDate(review.getWriteDate())
                        .like(review.getLikeCount())
                        .build();
                courseReviewResDtoList.add(courseReviewResDto);
            }
        }

        return courseReviewResDtoList;
    }

    @Override
    @Transactional
    public void writeCourseReview(Long courseId, String content, Double score) {
//        Review review = reviewRepository.findByCourse_CourseIdAndMember_MemberId(courseId, memberId);
//        if(review != null) {
//            // 리뷰 1회 작성 가능?
//        }

        Course course = courseRepository.findById(courseId).orElseThrow(CourseNotFoundException::new);
//      Member member = memberRepository.findMemberByLoginId(memberId);

        Date currentDate = new Date();
        Review review = Review.builder()
                .content(content)
                .score(score)
                .writeDate(currentDate)
                .likeCount(0)
//                .member(member)
                .course(course)
                .build();

        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void editCourseReview(Long reviewId, String content, Double score) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(CourseReviewsNotFoundException::new);

        Date currentDate = new Date();
        review = Review.builder()
                .reviewId(reviewId)
                .content(content)
                .score(score)
                .writeDate(currentDate) // 작성일? 수정일?
                .likeCount(review.getLikeCount())
                .member(review.getMember())
                .course(review.getCourse())
                .build();

        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void deleteCourseReview(Long courseId) {
//        reviewRepository.deleteByCourse_CourseIdAndMember_MemberId(courseId, memberId);
    }

}
