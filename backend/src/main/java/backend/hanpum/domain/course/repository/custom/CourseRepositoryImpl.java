package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private final JPAQueryFactory query;

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
                        qCourseDay.total_distance,
                        qCourseDay.total_duration,
                        qCourseDay.total_calorie))
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
                        qCourseDay.total_distance,
                        qCourseDay.total_duration,
                        qCourseDay.total_calorie))
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
