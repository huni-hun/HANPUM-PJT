package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public Optional<CourseListMapResDto> getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable) {
        QCourse qCourse = QCourse.course;
        QReview qReview = QReview.review;
        QCourseType qCourseType = QCourseType.courseType;
        QCourseDay qCourseDay = QCourseDay.courseDay;

        BooleanBuilder whereClause = new BooleanBuilder();
        if (targetCourse != null) {
            whereClause.and(qCourseType.typeName.eq(targetCourse));
        }
        if (maxDistance != null) {
            whereClause.and(qCourse.totalDistance.loe(maxDistance));
        }
        if (maxDays != null) {
            whereClause.and(qCourse.courseDays.size().loe(maxDays));
        }
        if (selectedTypes != null && !selectedTypes.isEmpty()) {
            whereClause.and(qCourseType.typeName.in(selectedTypes));
        }
        if (keyword != null) {
            String formattedKeyword = "%" + keyword + "%";

            whereClause.and(qCourse.courseName.like(formattedKeyword)
                    .or(qCourse.content.like(formattedKeyword)));
        }

        NumberExpression<Double> avgScore = qReview.score.avg().coalesce(0.0);
        NumberExpression<Integer> reviewCount = qReview.count().intValue().coalesce(0);
        NumberExpression<Double> popularityScore = avgScore.multiply(reviewCount); // 인기순 -> 현재는 평균 * 리뷰수. 나중 가중치 고려필요

        OrderSpecifier<?> orderSpecifier = null;
        for (Sort.Order order : pageable.getSort()) {
            String property = order.getProperty();
            boolean isAscending = order.isAscending();

            if (property.equalsIgnoreCase("review")) {
                orderSpecifier = isAscending ? reviewCount.asc() : reviewCount.desc();
            } else if (property.equalsIgnoreCase("distance")) {
                orderSpecifier = isAscending ? qCourse.totalDistance.asc() : qCourse.totalDistance.desc();
            } else if (property.equalsIgnoreCase("popularity")) {
                orderSpecifier = isAscending ? popularityScore.asc() : popularityScore.desc();
            }
        }

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
                .where(whereClause)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .groupBy(qCourse.courseId)
                .fetch();

        CourseListMapResDto courseListMapResDto = new CourseListMapResDto();
        Map<String, List<CourseResDto>> courseListMap = new HashMap<>();
        courseListMapResDto = courseListMapResDto.builder().CourseListMap(courseListMap).build();
        if(targetCourse != null) {
            courseListMapResDto.getCourseListMap().put(targetCourse.name(), courseList);
        } else {
            courseListMapResDto.getCourseListMap().put("searchResult", courseList);

        }

        return Optional.of(courseListMapResDto);
    }

    @Override
    public Optional<CourseDetailResDto> getCourseDetailByCourseId(Long courseId) {
        QCourse qCourse = QCourse.course;
        QCourseDay qCourseDay = QCourseDay.courseDay;
        QAttraction qAttraction = QAttraction.attraction;
        QCourseType qCourseType = QCourseType.courseType;
        QReview qReview = QReview.review;

        NumberExpression<Double> avgScore = qReview.score.avg().coalesce(0.0);
        NumberExpression<Integer> reviewCount = qReview.count().intValue().coalesce(0);

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
                        qCourse.member.memberId,
                        avgScore.as("scoreAvg"),
                        reviewCount.as("commentCnt")))
                .from(qCourse)
                .leftJoin(qReview).on(qCourse.courseId.eq(qReview.course.courseId))
                .where(qCourse.courseId.eq(courseId))
                .groupBy(qCourse.courseId)
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

    @Override
    public Optional<CourseUsageHistory> getCourseUsageHistory(Long courseId, Long memberId) {
        QCourseUsageHistory qCourseUsageHistory = QCourseUsageHistory.courseUsageHistory;

        CourseUsageHistory courseUsageHistory = query
                .select(Projections.constructor(CourseUsageHistory.class,
                        qCourseUsageHistory.courseUsageHistoryId,
                        qCourseUsageHistory.startDate,
                        qCourseUsageHistory.endDate,
                        qCourseUsageHistory.useFlag,
                        qCourseUsageHistory.achieveRate,
                        qCourseUsageHistory.course,
                        qCourseUsageHistory.member))
                .from(qCourseUsageHistory)
                .where(qCourseUsageHistory.course.courseId.eq(courseId)
                        .and(qCourseUsageHistory.member.memberId.eq(memberId)))
                .orderBy(qCourseUsageHistory.courseUsageHistoryId.desc())
                .fetchOne();

        return Optional.of(courseUsageHistory);
    }
}
