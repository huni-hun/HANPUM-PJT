package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.course.enums.CourseTypes;
import backend.hanpum.domain.schedule.dto.responseDto.*;
import backend.hanpum.domain.schedule.entity.Schedule;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepositoryCustom {

    Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId);

    Optional<ScheduleResDto> getGroupScheduleByMemberId(Long memberId);

    Optional<ScheduleDetailResDto> getScheduleDetail(Long memberId, Long scheduleId, Long courseId);

    Optional<GroupScheduleResDto> getGroupSchedule(Long memberId, Long groupId, Long scheduleId, Long courseId);

    // 일차별 하나씩만
    Optional<ScheduleDayResDto> getScheduleDayResDto(Long memberId, Long scheduleId, int day);

    Optional<List<ScheduleDayResDto>> getScheduleDayResDtoList(Long memberId, Long scheduleId);

    int activateScheduleForToday(String startDate);

    Optional<ScheduleTempResDto> getScheduleTempResDto(Long memberId);

    Optional<Long> checkMyScheduleCnt(Long memberId);

    List<CourseTypes> getCourseTypes(Long courseId);

    List<Schedule> findAllScheduleByMemberId(Long memberId);
}
