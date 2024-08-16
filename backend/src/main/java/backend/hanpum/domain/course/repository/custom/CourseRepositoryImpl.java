package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public Optional<CourseListMapResDto> getCourseList(CourseTypes targetCourse) {
        QCourse qCourse = QCourse.course;
        QReview qReview = QReview.review;
        QCourseType qCourseType = QCourseType.courseType;

        NumberExpression<Double> avgScore = qReview.score.avg().coalesce(0.0);  // 평균 스코어
        NumberExpression<Integer> reviewCount = qReview.count().intValue().coalesce(0);

        /*
          경로타입에 따라 목록 조회
          페이징 및 정렬은 나중에 추가
        */
        List<CourseResDto> courseList = query
                .select(Projections.constructor(CourseResDto.class,
                        qCourse.courseId,
                        qCourse.courseName,
                        qCourse.backgroundImg,
                        qCourse.content,
                        qCourse.writeState,
                        qCourse.openState,
                        qCourse.writeDate,
                        qCourse.startPoint,
                        qCourse.endPoint,
                        qCourse.totalDistance,
                        qCourse.member.memberId,
                        avgScore.as("scoreAvg"),
                        reviewCount.as("commentCnt")))
                .from(qCourse)
                .leftJoin(qReview).on(qCourse.courseId.eq(qReview.course.courseId))
                .leftJoin(qCourseType).on(qCourse.courseId.eq(qCourseType.course.courseId))
                .where(qCourseType.typeName.eq(targetCourse))
                .groupBy(qCourse.courseId)
                .fetch();

        CourseListMapResDto courseListMapResDto = new CourseListMapResDto();
        Map<String, List<CourseResDto>> courseListMap = new HashMap<>();
        courseListMapResDto = courseListMapResDto.builder().CourseListMap(courseListMap).build();
        courseListMapResDto.getCourseListMap().put(targetCourse.name(), courseList);

        return Optional.of(courseListMapResDto);
    }

    @Override
    public Optional<CourseDetailResDto> getCourseDetailByCourseId(Long courseId) {
        QCourse qCourse = QCourse.course;
        QCourseDay qCourseDay = QCourseDay.courseDay;
        QAttraction qAttraction = QAttraction.attraction;
        QCourseType qCourseType = QCourseType.courseType;

        List<CourseTypes> courseTypes = query
                .select(qCourseType.typeName)
                .from(qCourseType)
                .where(qCourseType.course.courseId.eq(courseId))
                .fetch();

        CourseResDto courseResDto = query
                .select(Projections.constructor(CourseResDto.class,
                        qCourse.courseId,
                        qCourse.courseName,
                        qCourse.backgroundImg,
                        qCourse.content,
                        qCourse.writeState,
                        qCourse.openState,
                        qCourse.writeDate,
                        qCourse.startPoint,
                        qCourse.endPoint,
                        qCourse.totalDistance,
                        qCourse.member.memberId))
                .from(qCourse)
                .where(qCourse.courseId.eq(courseId))
                .fetchOne();

        if (courseResDto == null) {
            return Optional.empty();
        }
        courseResDto.setCourseTypes(courseTypes);

        List<CourseDayResDto> courseDays = query
                .select(Projections.constructor(CourseDayResDto.class,
                        qCourseDay.dayNumber,
                        qCourseDay.totalDistance,
                        qCourseDay.totalDuration,
                        qCourseDay.totalCalorie))
                .from(qCourseDay)
                .where(qCourseDay.course.courseId.eq(courseId))
                .fetch();

        List<AttractionResDto> attractions = query
                .select(Projections.constructor(AttractionResDto.class,
                        qAttraction.attractionId,
                        qAttraction.name,
                        qAttraction.type,
                        qAttraction.address,
                        qAttraction.lat,
                        qAttraction.lon,
                        qAttraction.img))
                .from(qAttraction)
                .where(qAttraction.courseDay.course.courseId.eq(courseId))
                .fetch();

        CourseDetailResDto result = CourseDetailResDto.builder()
                .course(courseResDto)
                .courseDays(courseDays)
                .attractions(attractions)
                .build();

        return Optional.of(result);
    }

    @Override
    public Optional<GetCourseDayResDto> getCourseDayByCourseIdAndDay(Long courseId, Integer day) {

        QCourseDay qCourseDay = QCourseDay.courseDay;
        QWaypoint qWaypoint = QWaypoint.waypoint;

        CourseDayResDto courseDay = query
                .select(Projections.constructor(CourseDayResDto.class,
                        qCourseDay.dayNumber,
                        qCourseDay.totalDistance,
                        qCourseDay.totalDuration,
                        qCourseDay.totalCalorie))
                .from(qCourseDay)
                .where(qCourseDay.course.courseId.eq(courseId)
                .and(qCourseDay.dayNumber.eq(day)))
                .fetchOne();

        List<WayPointResDto> wayPoints = query
                .select(Projections.constructor(WayPointResDto.class,
                        qWaypoint.waypointId,
                        qWaypoint.type,
                        qWaypoint.name,
                        qWaypoint.address,
                        qWaypoint.lat,
                        qWaypoint.lon,
                        qWaypoint.pointNumber,
                        qWaypoint.distance,
                        qWaypoint.duration,
                        qWaypoint.calorie))
                .from(qWaypoint)
                .where(qWaypoint.courseDay.course.courseId.eq(courseId)
                .and(qWaypoint.courseDay.dayNumber.eq(day)))
                .fetch();

        GetCourseDayResDto result = GetCourseDayResDto.builder().
                courseDay(courseDay).
                wayPoints(wayPoints).
                build();

        return Optional.of(result);
    }
}
