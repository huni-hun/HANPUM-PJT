package backend.hanpum.domain.course.service;

import backend.hanpum.domain.course.dto.requestDto.*;
import backend.hanpum.domain.course.dto.responseDto.CourseDetailResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseListMapResDto;
import backend.hanpum.domain.course.dto.responseDto.CourseReviewResDto;
import backend.hanpum.domain.course.dto.responseDto.GetCourseDayResDto;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.repository.*;
import backend.hanpum.domain.member.repository.MemberRepository;
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
import java.util.Set;
import java.util.stream.Collectors;

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
        Double allDayDistance = 0.0;
        for (CourseDayReqDto courseDayReqDto : makeCourseReqDto.getCourseDayReqDtoList()) {
            for (WayPointReqDto waypointReqDto : courseDayReqDto.getWayPointReqDtoList()) {
                allDayDistance += Double.parseDouble(waypointReqDto.getDistance());
            }
        }

        String startPoint = makeCourseReqDto.getCourseDayReqDtoList().stream()
                .findFirst()
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().findFirst())
                .map(WayPointReqDto::getName)
                .orElse("Unknown");

        String endPoint = makeCourseReqDto.getCourseDayReqDtoList().stream()
                .reduce((first, second) -> second)
                .flatMap(courseDayReqDto -> courseDayReqDto.getWayPointReqDtoList().stream().reduce((first, second) -> second))
                .map(WayPointReqDto::getName)
                .orElse("Unknown");
        
        Date currentDate = new Date();
        Course course = Course.builder()
                .courseName(makeCourseReqDto.getCourseName())
                .content(makeCourseReqDto.getContent())
                .openState(makeCourseReqDto.isOpenState())
                .writeState(makeCourseReqDto.isWriteState())
                .writeDate(currentDate)
                .startPoint(startPoint)
                .endPoint(endPoint)
                .totalDistance(allDayDistance)
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
    @Transactional
    public void editCourse(EditCourseReqDto editCourseReqDto) {
        Course course = courseRepository.findById(editCourseReqDto.getCourseId()).orElseThrow(CourseNotFoundException::new);

        course.updateCourse(
                editCourseReqDto.getCourseName(),
                editCourseReqDto.getContent(),
                editCourseReqDto.isOpenState(),
                editCourseReqDto.isWriteState()
        );

        if(editCourseReqDto.getBgImage() != null) {
            // S3 image update 로직
        }

        List<CourseType> courseTypeList = courseTypeRepository.findByCourse_courseId(editCourseReqDto.getCourseId());
        List<String> existCourseTypeNameList = courseTypeList.stream()
                .map(courseType -> courseType.getTypeName().name())
                .collect(Collectors.toList());
        List<String> newCourseTypeNameList = editCourseReqDto.getCourseTypeList();
        for (int i = 0; i < existCourseTypeNameList.size(); i++) {
            if(!newCourseTypeNameList.contains(existCourseTypeNameList.get(i))) {
                courseTypeRepository.delete(courseTypeList.get(i));
            }
        }

        for (int i = 0; i < newCourseTypeNameList.size(); i++) {
            if(!existCourseTypeNameList.contains(newCourseTypeNameList.get(i))) {
                CourseType courseType = CourseType.builder()
                        .course(course)
                        .typeName(CourseTypes.valueOf(newCourseTypeNameList.get(i)))
                        .build();

                courseTypeRepository.save(courseType);
            }
        }

        // CourseDay 업데이트
        Set<Integer> existDayNumbers = course.getCourseDays().stream()
                .map(CourseDay::getDayNumber)
                .collect(Collectors.toSet());

        for (CourseDayReqDto newCourseDay : editCourseReqDto.getCourseDayReqDtoList()) {
            Double totalCalorie = 0.0;
            Double totalDuration = 0.0;
            Double totalDistance = 0.0;
            for (WayPointReqDto waypointReqDto : newCourseDay.getWayPointReqDtoList()) {
                totalCalorie += Double.parseDouble(waypointReqDto.getCalorie());
                totalDuration += Double.parseDouble(waypointReqDto.getDuration());
                totalDistance += Double.parseDouble(waypointReqDto.getDistance());
            }

            if (existDayNumbers.contains(newCourseDay.getDayNumber())) {
                CourseDay existDay = course.getCourseDays().stream()
                        .filter(exDay -> exDay.getDayNumber().equals(newCourseDay.getDayNumber()))
                        .findFirst().orElseThrow();
                updateCourseDay(existDay, newCourseDay, totalCalorie, totalDuration, totalDistance);
            } else {
                CourseDay newDay = CourseDay.builder()
                        .dayNumber(newCourseDay.getDayNumber())
                        .course(course)
                        .totalDistance(String.format("%.1f", totalDistance))
                        .totalDuration(String.format("%.1f", totalDuration))
                        .totalCalorie(String.format("%.1f", totalCalorie))
                        .build();
                course.getCourseDays().add(newDay);
            }
            existDayNumbers.remove(newCourseDay.getDayNumber());
        }

        for (CourseDay courseDay : course.getCourseDays()) {
            if(existDayNumbers.contains(courseDay.getDayNumber())) {
                courseDayRepository.delete(courseDay);
            }
        }
        course.getCourseDays().removeIf(day -> existDayNumbers.contains(day.getDayNumber()));
        courseRepository.save(course);
    }

    private void updateCourseDay(CourseDay existDay, CourseDayReqDto newDay, Double totalCalorie, Double totalDuration, Double totalDistance) {
        // CourseDay 정보 업데이트
        existDay.updateCourseDayTotal(String.format("%.1f", totalCalorie), String.format("%.1f", totalDuration), String.format("%.1f", totalDistance));

        // Attraction 업데이트
        Set<String> existAttractionName = existDay.getAttractions().stream()
                .map(Attraction::getName)
                .collect(Collectors.toSet());

        for (AttractionReqDto newAttraction : newDay.getAttractionReqDtoList()) {
            if (existAttractionName.contains(newAttraction.getName())) {
                Attraction existAttraction = existDay.getAttractions().stream()
                        .filter(attraction -> attraction.getName().equals(newAttraction.getName()))
                        .findFirst().orElseThrow();

                existAttraction.updateAttraction(newAttraction.getName(),
                        newAttraction.getType(),
                        newAttraction.getAddress(),
                        newAttraction.getLat(),
                        newAttraction.getLon());

                if(newAttraction.getImage() != null) {
                    // S3 image update 로직
                }
            } else {
                Attraction attraction = Attraction.builder()
                        .courseDay(existDay)
                        .name(newAttraction.getName())
                        .type(newAttraction.getType())
                        .address(newAttraction.getAddress())
                        .lat(newAttraction.getLat())
                        .lon(newAttraction.getLon())
                        .img("TEMP") // S3 미생성. 이미지 업로드 미구현. 추후 변경
                        .build();

                existDay.getAttractions().add(attraction);
            }
            existAttractionName.remove(newAttraction.getName());
        }

        for (Attraction attraction : existDay.getAttractions()) {
            if(existAttractionName.contains(attraction.getName())) {
                attractionRepository.delete(attraction);
            }
        }
        existDay.getAttractions().removeIf(attraction -> existAttractionName.contains(attraction.getName()));

        // Waypoint 업데이트
        Set<String> existPointNumber = existDay.getWaypoints().stream()
                .map(Waypoint::getPointNumber)
                .collect(Collectors.toSet());

        for (WayPointReqDto newWaypoint : newDay.getWayPointReqDtoList()) {
            if (existPointNumber.contains(newWaypoint.getPointNumber())) {
                Waypoint existWaypoint = existDay.getWaypoints().stream()
                        .filter(waypoint -> waypoint.getPointNumber().equals(newWaypoint.getPointNumber()))
                        .findFirst().orElseThrow();

                existWaypoint.updateWayPoint(newWaypoint.getType(),
                        newWaypoint.getName(),
                        newWaypoint.getAddress(),
                        newWaypoint.getLat(),
                        newWaypoint.getLon(),
                        newWaypoint.getPointNumber(),
                        newWaypoint.getDistance(),
                        newWaypoint.getDuration(),
                        newWaypoint.getCalorie());
            } else {
                Waypoint waypoint = Waypoint.builder()
                        .courseDay(existDay)
                        .type(newWaypoint.getType())
                        .name(newWaypoint.getName())
                        .address(newWaypoint.getAddress())
                        .lat(newWaypoint.getLat())
                        .lon(newWaypoint.getLon())
                        .pointNumber(newWaypoint.getPointNumber())
                        .distance(newWaypoint.getDistance())
                        .duration(newWaypoint.getDuration())
                        .calorie(newWaypoint.getCalorie())
                        .build();

                existDay.getWaypoints().add(waypoint);
            }

            existPointNumber.remove(newWaypoint.getPointNumber());
        }

        for (Waypoint waypoint : existDay.getWaypoints()) {
            if(existPointNumber.contains(waypoint.getPointNumber())) {
                waypointRepository.delete(waypoint);
            }
        }
        existDay.getWaypoints().removeIf(waypoint -> existPointNumber.contains(waypoint.getPointNumber()));
    }

    @Override
    public void deleteCourse(Long memberId, Long courseId) {
        Course course;
        course = courseRepository.findByMember_MemberIdAndCourseId(memberId, courseId).orElseThrow(CourseNotFoundException::new);
        if (course.getBackgroundImg() != null) {
            // S3 이미지 삭제 로직
        }
        courseRepository.delete(course);
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
