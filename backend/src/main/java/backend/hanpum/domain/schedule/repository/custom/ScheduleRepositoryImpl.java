package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.member.entity.Member;
import backend.hanpum.domain.member.repository.MemberRepository;
import backend.hanpum.domain.schedule.dto.responseDto.*;
import backend.hanpum.exception.exception.auth.MemberNotFoundException;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static backend.hanpum.domain.course.entity.QCourseDay.courseDay;
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
                                schedule.title,
                                schedule.type,
                                schedule.startDate,
                                schedule.state
                        )).from(schedule)
                .where(schedule.member.memberId.eq(memberId))
                .fetch());
    }

    @Override
    public Optional<List<ScheduleResDto>> getGroupScheduleByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        Long groupId = member.getGroupMember().getGroup().getGroupId();
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleResDto.class,
                                schedule.id,
                                schedule.title,
                                schedule.type,
                                schedule.startDate,
                                schedule.state
                        )).from(schedule)
                .where(schedule.group.groupId.eq(groupId))
                .fetch());

    }

    @Override
    public Optional<ScheduleDayResDto> getScheduleDayResDto(Long memberId, Long scheduleId, int day) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleDayResDto.class,
                                scheduleDay.id,
                                scheduleDay.date,
                                scheduleDay.running,
                                courseDay.totalDistance,
                                courseDay.totalDuration,
                                courseDay.totalCalorie,
                                Projections.list(
                                        Projections.constructor(ScheduleWayPointResDto.class,
                                                scheduleWayPoint.id,
                                                waypoint.name,
                                                waypoint.type,
                                                waypoint.address,
                                                waypoint.lat,
                                                waypoint.lon
                                        )
                                )
                        )
                ).from(scheduleDay)
                .leftJoin(scheduleDay.courseDay, courseDay)
                .leftJoin(scheduleDay.scheduleWayPointList, scheduleWayPoint)
                .leftJoin(scheduleWayPoint.waypoint, waypoint)
                .where(scheduleDay.schedule.id.eq(scheduleId).and(scheduleDay.courseDay.dayNumber.eq(day)).and(scheduleDay.schedule.member.memberId.eq(memberId)))
                .fetchOne());
    }

    @Override
    public Optional<List<ScheduleDayResDto>> getScheduleDayResDtoList(Long memberId, Long scheduleId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleDayResDto.class,
                                scheduleDay.id,
                                scheduleDay.date,
                                scheduleDay.running,
                                courseDay.totalDistance,
                                courseDay.totalDuration,
                                courseDay.totalCalorie,
                                Projections.list(
                                        Projections.constructor(ScheduleWayPointResDto.class,
                                                scheduleWayPoint.id,
                                                waypoint.name,
                                                waypoint.type,
                                                waypoint.address,
                                                waypoint.lat,
                                                waypoint.lon
                                        )
                                )
                        )
                ).from(scheduleDay)
                .leftJoin(scheduleDay.courseDay, courseDay)
                .leftJoin(scheduleDay.scheduleWayPointList, scheduleWayPoint)
                .leftJoin(scheduleWayPoint.waypoint, waypoint)
                .where(scheduleDay.schedule.id.eq(scheduleId).and(scheduleDay.schedule.member.memberId.eq(memberId)))
                .orderBy(scheduleDay.courseDay.dayNumber.asc())
                .fetch());
    }

    @Override
    public int activateScheduleForToday(String startDate) {
        long updatedCount = query.update(schedule)
                .set(schedule.state, true)
                .where(schedule.state.isFalse()
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
                )).from(schedule).where(schedule.member.memberId.eq(memberId).and(schedule.state.eq(true)))
                .fetchOne());
    }
}
