package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.course.entity.Waypoint;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleDayReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleWayPointResDto;
import backend.hanpum.domain.schedule.entity.ScheduleDay;
import backend.hanpum.domain.schedule.entity.ScheduleWayPoint;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static backend.hanpum.domain.course.entity.QCourseDay.courseDay;
import static backend.hanpum.domain.schedule.entity.QSchedule.schedule;
import static backend.hanpum.domain.schedule.entity.QScheduleDay.scheduleDay;
import static backend.hanpum.domain.schedule.entity.QScheduleWayPoint.scheduleWayPoint;
import static backend.hanpum.domain.course.entity.QWaypoint.waypoint;

@RequiredArgsConstructor
public class ScheduleRepositoryImpl implements ScheduleRepositoryCustom {

    private final JPAQueryFactory query;

    @Override
    public Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleResDto.class,
                                schedule.id,
                                schedule.type,
                                schedule.date,
                                schedule.state
//                                member.id,
//                                course.id,
                        )).from(schedule)
//                .where(schedule.member.id.eq(memberId))
                .fetch());
    }

    @Override
    public Optional<ScheduleDayResDto> getScheduleDayResDto(Long scheduleId, int day) {
        return Optional.ofNullable(query.select(
                        Projections.constructor(ScheduleDayResDto.class,
                                scheduleDay.id,
                                scheduleDay.date,
                                scheduleDay.running,
                                courseDay.total_distance,
                                courseDay.total_duration,
                                courseDay.total_calorie,
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
                .where(scheduleDay.schedule.id.eq(scheduleId).and(scheduleDay.courseDay.dayNumber.eq(day)))
                .fetchOne());
    }
}
