package backend.hanpum.domain.course.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.*;
import backend.hanpum.domain.course.entity.*;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.course.repository.InterestCourseRepository;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.exception.exception.auth.MemberNotFoundException;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.lang.reflect.Type;
import java.util.*;

@RequiredArgsConstructor
public class CourseRepositoryImpl implements CourseRepositoryCustom {

    private final InterestCourseRepository interestCourseRepository;
    private final MemberRepository memberRepository;
    private final JPAQueryFactory query;

    @Override
    public Optional<CourseListMapResDto> getCourseList(CourseTypes targetCourse, Double maxDistance, Integer maxDays, List<CourseTypes> selectedTypes, String keyword, Pageable pageable, Long memberId) {
        QCourse qCourse = QCourse.course;
        QReview qReview = QReview.review;
        QCourseType qCourseType = QCourseType.courseType;
        QCourseDay qCourseDay = QCourseDay.courseDay;

        BooleanBuilder whereClause = new BooleanBuilder();
        whereClause.and(qCourse.deleteState.isNull().or(qCourse.deleteState.eq(false))); // deleteState가 null이거나 false인 경우만 조회

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
                        reviewCount.as("commentCnt"),
                        qCourse.totalDays))
                .from(qCourse)
                .leftJoin(qReview).on(qCourse.courseId.eq(qReview.course.courseId))
                .leftJoin(qCourseType).on(qCourse.courseId.eq(qCourseType.course.courseId))
                .where(whereClause)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .groupBy(qCourse.courseId)
                .fetch();

        if(memberId != null) {
            for (CourseResDto courseResDto : courseList) {
                if(interestCourseRepository.findByMember_MemberIdAndCourse_CourseId(memberId, courseResDto.getCourseId()).isPresent())
                    courseResDto.setInterestFlag(true);
            }
        }

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
                        reviewCount.as("commentCnt"),
                        qCourse.totalDays))
                .from(qCourse)
                .leftJoin(qReview).on(qCourse.courseId.eq(qReview.course.courseId))
                .where(qCourse.courseId.eq(courseId)
                        .and(qCourse.deleteState.isNull().or(qCourse.deleteState.eq(false))))
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
                .orderBy(qCourseDay.dayNumber.asc())
                .fetch();

        Member member = memberRepository.findByCourses_courseId(courseResDto.getCourseId()).orElseThrow(MemberNotFoundException::new);
        CourseDetailResDto result = CourseDetailResDto.builder()
                .course(courseResDto)
                .nickname(member.getNickname())
                .profilePicture(member.getProfilePicture())
                .courseDays(courseDays)
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

        List<Waypoint> wayPoints = query
                .select(Projections.constructor(Waypoint.class,
                        qWaypoint.waypointId,
                        qWaypoint.type,
                        qWaypoint.name,
                        qWaypoint.address,
                        qWaypoint.lat,
                        qWaypoint.lon,
                        qWaypoint.pointNumber,
                        qWaypoint.distance,
                        qWaypoint.duration,
                        qWaypoint.calorie,
                        qWaypoint.polyline))
                .from(qWaypoint)
                .where(qWaypoint.courseDay.course.courseId.eq(courseId)
                .and(qWaypoint.courseDay.dayNumber.eq(day)))
                .fetch();

        List<WayPointResDto> wayPointResDtoList = new ArrayList<>();
        for(Waypoint waypoint : wayPoints) {
            Gson gson = new Gson();
            Type listType = new TypeToken<List<Double>>() {}.getType();
            List<Double> vertexes = gson.fromJson(waypoint.getPolyline(), listType);

            wayPointResDtoList.add(WayPointResDto.builder()
                    .waypointId(waypoint.getWaypointId())
                    .type(waypoint.getType())
                    .name(waypoint.getName())
                    .address(waypoint.getAddress())
                    .lat(waypoint.getLat())
                    .lon(waypoint.getLon())
                    .pointNumber(waypoint.getPointNumber())
                    .distance(waypoint.getDistance())
                    .duration(waypoint.getDuration())
                    .calorie(waypoint.getCalorie())
                    .vertexes(vertexes)
                    .build());
        }

        GetCourseDayResDto result = GetCourseDayResDto.builder().
                courseDay(courseDay).
                wayPoints(wayPointResDtoList).
                build();

        return Optional.of(result);
    }

    @Override
    public List<CourseUsageHistory> getCourseUsageHistory(Long courseId, Long memberId) {
        QCourseUsageHistory qCourseUsageHistory = QCourseUsageHistory.courseUsageHistory;

        List<CourseUsageHistory> courseUsageHistoryList = query
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
                .fetch();

        return courseUsageHistoryList;
    }
}
