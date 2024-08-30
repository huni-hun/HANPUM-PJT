package backend.hanpum.domain.schedule.repository.custom;

import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleInProgressResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleTempResDto;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepositoryCustom {

    Optional<List<ScheduleResDto>> getMyScheduleByMemberId(Long memberId);

    Optional<ScheduleResDto> getGroupScheduleByMemberId(Long memberId);

    // 일차별 하나씩만
    Optional<ScheduleDayResDto> getScheduleDayResDto(Long memberId, Long scheduleId, int day);

    Optional<List<ScheduleDayResDto>> getScheduleDayResDtoList(Long memberId, Long scheduleId);

    int activateScheduleForToday(String startDate);

    Optional<ScheduleTempResDto> getScheduleTempResDto(Long memberId);

    Optional<Long> checkMyScheduleCnt(Long memberId);
}
