package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.responseDto.*;
import backend.hanpum.exception.exception.auth.MemberNotFoundException;
import backend.hanpum.exception.exception.schedule.ScheduleDayNotFoundException;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static backend.hanpum.domain.course.entity.QAttraction.attraction;
import static backend.hanpum.domain.course.entity.QCourseDay.courseDay;
import static backend.hanpum.domain.course.entity.QCourseType.courseType;
import static backend.hanpum.domain.course.entity.QWaypoint.waypoint;
import static backend.hanpum.domain.schedule.entity.QSchedule.schedule;
import static backend.hanpum.domain.schedule.entity.QScheduleDay.scheduleDay;
import static backend.hanpum.domain.schedule.entity.QScheduleWayPoint.scheduleWayPoint;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

    private final JPAQueryFactory query;
    private final MemberRepository memberRepository;

    @Override
    public Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleResDto.class,
                                schedule.id,
                                schedule.course.backgroundImg,
                                schedule.course.courseName,
                                schedule.type,
                                schedule.course.startPoint,
                                schedule.course.endPoint,
                                schedule.startDate,
                                schedule.endDate,
                                schedule.state
                        )).from(schedule)
                .where(schedule.type.eq("private")
                        .and(schedule.member.memberId.eq(memberId))
                        .and(schedule.state.in(0, 1)))
                .fetch());
    }

    @Override
    public Optional<ScheduleResDto> getGroupScheduleByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        Long groupId = member.getGroupMember().getGroup().getGroupId();
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleResDto.class,
                                schedule.id,
                                schedule.course.backgroundImg,
                                schedule.course.courseName,
                                schedule.type,
                                schedule.course.startPoint,
                                schedule.course.endPoint,
                                schedule.startDate,
                                schedule.endDate,
                                schedule.state
                        )).from(schedule)
                .where(schedule.type.eq("group")
                        .and(schedule.group.groupId.eq(groupId))
                        .and(schedule.state.in(0, 1)))
                .fetchOne());

    }

    @Override
    public Optional<ScheduleDetailResDto> getScheduleDetail(Long memberId, Long scheduleId, Long courseId) {

        ScheduleDetailResDto scheduleDetailResDto = query.select(Projections.constructor(ScheduleDetailResDto.class,
                        schedule.id,
                        schedule.course.content,
                        schedule.course.backgroundImg,
                        schedule.course.courseName,
                        schedule.type,
                        schedule.course.startPoint,
                        schedule.course.endPoint,
                        schedule.startDate,
                        schedule.endDate,
                        schedule.state,
                        schedule.course.totalDistance
                )).from(schedule)
                .where(schedule.id.eq(scheduleId)
                        .and(schedule.member.memberId.eq(memberId)))
                .fetchOne();

        if (scheduleDetailResDto != null) {
            List<ScheduleDayResDto> scheduleDayResDtoList = getScheduleDayResDtoList(memberId, scheduleId).orElseThrow(ScheduleDayNotFoundException::new);
            scheduleDetailResDto.setScheduleDayResDtoList(scheduleDayResDtoList);
            List<CourseTypes> courseTypes = getCourseTypes(courseId);
            scheduleDetailResDto.setCourseTypes(courseTypes);
        }

        return Optional.ofNullable(scheduleDetailResDto);
    }


    /* case 1 */
    @Override
    public Optional<ScheduleDayResDto> getScheduleDayResDto(Long memberId, Long scheduleId, int day) {
        // ScheduleDay의 주요 정보를 한 번의 쿼리로 가져옴
        ScheduleDayResDto scheduleDayResDto = query.select(
                        Projections.constructor(ScheduleDayResDto.class,
                                scheduleDay.id,
                                scheduleDay.date,
                                scheduleDay.visit,
                                scheduleDay.running,
                                scheduleDay.courseDay.totalDistance,
                                scheduleDay.courseDay.totalDuration,
                                scheduleDay.courseDay.totalCalorie
                        ))
                .from(scheduleDay)
                .leftJoin(scheduleDay.courseDay, courseDay)
                .where(scheduleDay.schedule.id.eq(scheduleId)
                        .and(scheduleDay.courseDay.dayNumber.eq(day))
                        .and(scheduleDay.schedule.member.memberId.eq(memberId)))
                .fetchOne();

        if (scheduleDayResDto != null) {
            // 연관된 ScheduleWayPoint 데이터를 서브 쿼리로 가져옴
            List<ScheduleWayPointResDto> wayPoints = getScheduleWayPointResDtoList(scheduleDayResDto.getScheduleDayId());
            scheduleDayResDto.setScheduleWayPointList(wayPoints);

            // 연관된 Attraction 데이터를 서브 쿼리로 가져옴
            List<AttractionResDto> attractions = getAttractionResDtoList(scheduleDayResDto.getScheduleDayId());
            scheduleDayResDto.setAttractionList(attractions);
        }

        return Optional.ofNullable(scheduleDayResDto);
    }

    @Override
    public Optional<List<ScheduleDayResDto>> getScheduleDayResDtoList(Long memberId, Long scheduleId) {
        List<ScheduleDayResDto> scheduleDays = query.select(
                        Projections.constructor(ScheduleDayResDto.class,
                                scheduleDay.id,
                                scheduleDay.date,
                                scheduleDay.visit,
                                scheduleDay.running,
                                scheduleDay.courseDay.totalDistance,
                                scheduleDay.courseDay.totalDuration,
                                scheduleDay.courseDay.totalCalorie
                        ))
                .from(scheduleDay)
                .leftJoin(scheduleDay.courseDay, courseDay)
                .where(scheduleDay.schedule.id.eq(scheduleId)
                        .and(scheduleDay.schedule.member.memberId.eq(memberId)))
                .orderBy(scheduleDay.courseDay.dayNumber.asc())
                .fetch();

        if (scheduleDays != null && !scheduleDays.isEmpty()) {
            for (ScheduleDayResDto scheduleDayResDto : scheduleDays) {
                // 연관된 ScheduleWayPoint 데이터를 서브 쿼리로 가져옴
                List<ScheduleWayPointResDto> wayPoints = getScheduleWayPointResDtoList(scheduleDayResDto.getScheduleDayId());
                scheduleDayResDto.setScheduleWayPointList(wayPoints);

                // 연관된 Attraction 데이터를 서브 쿼리로 가져옴
                List<AttractionResDto> attractions = getAttractionResDtoList(scheduleDayResDto.getScheduleDayId());
                scheduleDayResDto.setAttractionList(attractions);
            }
        }

        return Optional.ofNullable(scheduleDays);
    }

    private List<ScheduleWayPointResDto> getScheduleWayPointResDtoList(Long scheduleDayId) {
        return query.select(Projections.constructor(ScheduleWayPointResDto.class,
                        scheduleWayPoint.id,
                        waypoint.name,
                        waypoint.type,
                        waypoint.address,
                        waypoint.lat,
                        waypoint.lon,
                        scheduleWayPoint.state))
                .from(scheduleWayPoint)
                .leftJoin(scheduleWayPoint.waypoint, waypoint)
                .where(scheduleWayPoint.scheduleDay.id.eq(scheduleDayId))
                .fetch();
    }

    private List<AttractionResDto> getAttractionResDtoList(Long scheduleDayId) {
        return query.select(Projections.constructor(AttractionResDto.class,
                        attraction.attractionId,
                        attraction.name,
                        attraction.type,
                        attraction.address,
                        attraction.lat,
                        attraction.lon,
                        attraction.img))
                .from(attraction)
                .where(attraction.courseDay.scheduleDayList.any().id.eq(scheduleDayId))
                .fetch();
    }

    @Override
    public List<CourseTypes> getCourseTypes(Long courseId) {
        List<CourseTypes> courseTypes = query
                .select(courseType.typeName)
                .from(courseType)
                .where(courseType.course.courseId.eq(courseId))
                .fetch();
        return courseTypes;
    }

    /* case 2 */
//    @Override
//    public Optional<ScheduleDayResDto> getScheduleDayResDto(Long memberId, Long scheduleId, int day) {
//        return Optional.ofNullable(query.select(
//                        Projections.constructor(ScheduleDayResDto.class,
//                                scheduleDay.id,
//                                scheduleDay.date,
//                                scheduleDay.visit,
//                                scheduleDay.running,
//                                courseDay.totalDistance,
//                                courseDay.totalDuration,
//                                courseDay.totalCalorie,
//                                Projections.list(
//                                        Projections.constructor(ScheduleWayPointResDto.class,
//                                                scheduleWayPoint.id,
//                                                waypoint.name,
//                                                waypoint.type,
//                                                waypoint.address,
//                                                waypoint.lat,
//                                                waypoint.lon,
//                                                scheduleWayPoint.visit
//                                        )
//                                ),
//                                Projections.list(
//                                        Projections.constructor(AttractionResDto.class,
//                                                attraction.attractionId,
//                                                attraction.name,
//                                                attraction.type,
//                                                attraction.address,
//                                                attraction.lat,
//                                                attraction.lon,
//                                                attraction.img
//                                        )
//                                )
//                        ))
//                .from(scheduleDay)
//                .leftJoin(scheduleDay.courseDay, courseDay)
//                .leftJoin(scheduleDay.scheduleWayPointList, scheduleWayPoint).fetchJoin()
//                .leftJoin(scheduleWayPoint.waypoint, waypoint)
//                .leftJoin(courseDay.attractions, attraction).fetchJoin()
//                .where(scheduleDay.schedule.id.eq(scheduleId)
//                        .and(scheduleDay.courseDay.dayNumber.eq(day))
//                        .and(scheduleDay.schedule.member.memberId.eq(memberId)))
//                .fetchOne());
//    }

//    @Override
//    public Optional<List<ScheduleDayResDto>> getScheduleDayResDtoList(Long memberId, Long scheduleId) {
//        return Optional.ofNullable(query.select(
//                        Projections.constructor(ScheduleDayResDto.class,
//                                scheduleDay.id,
//                                scheduleDay.date,
//                                scheduleDay.visit,
//                                scheduleDay.running,
//                                courseDay.totalDistance,
//                                courseDay.totalDuration,
//                                courseDay.totalCalorie,
//                                Projections.list(
//                                        Projections.constructor(ScheduleWayPointResDto.class,
//                                                scheduleWayPoint.id,
//                                                waypoint.name,
//                                                waypoint.type,
//                                                waypoint.address,
//                                                waypoint.lat,
//                                                waypoint.lon
//                                        )
//                                ),
//                                Projections.list(
//                                        Projections.constructor(AttractionResDto.class,
//                                                attraction.attractionId,
//                                                attraction.name,
//                                                attraction.type,
//                                                attraction.address,
//                                                attraction.lat,
//                                                attraction.lon,
//                                                attraction.img
//                                        )
//                                )
//                        ))
//                .from(scheduleDay)
//                .leftJoin(scheduleDay.courseDay, courseDay)
//                .leftJoin(scheduleDay.scheduleWayPointList, scheduleWayPoint).fetchJoin()
//                .leftJoin(scheduleWayPoint.waypoint, waypoint)
//                .leftJoin(courseDay.attractions, attraction).fetchJoin()
//                .where(scheduleDay.schedule.id.eq(scheduleId)
//                        .and(scheduleDay.schedule.member.memberId.eq(memberId)))
//                .orderBy(scheduleDay.courseDay.dayNumber.asc())
//                .fetch());
//    }

    /* */

    @Override
    public int activateScheduleForToday(String startDate) {
        long updatedCount = query.update(schedule)
                .set(schedule.state, 1)
                .where(schedule.state.eq(0)
                        .and(schedule.startDate.eq(startDate)))
                .execute();
        return (int) updatedCount;
    }

    @Override
    public Optional<ScheduleTempResDto> getScheduleTempResDto(Long memberId) {

        return Optional.ofNullable(query.select(Projections.constructor(ScheduleTempResDto.class,
                        schedule.id,
                        schedule.course.startPoint,
                        schedule.course.endPoint,
                        schedule.startDate,
                        schedule.endDate,
                        schedule.course.totalDistance
                )).from(schedule)
                .where(schedule.state.eq(1).and(memberCondition(memberId))
                )
                .fetchOne());
    }

    @Override
    public Optional<Long> checkMyScheduleCnt(Long memberId) {
        return Optional.ofNullable(query.select(schedule.count())
                .from(schedule)
                .where(schedule.member.memberId.eq(memberId)
                        .and(schedule.type.eq("private"))
                        .and(schedule.state.in(0, 1)))
                .fetchOne());
    }

    private BooleanExpression memberCondition(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        Long groupId = member.getGroupMember() == null ? null : member.getGroupMember().getGroup().getGroupId();
        if (groupId != null) {
            return schedule.member.memberId.eq(memberId).or(schedule.group.groupId.eq(groupId));
        } else {
            return schedule.member.memberId.eq(memberId);
        }
    }
}
