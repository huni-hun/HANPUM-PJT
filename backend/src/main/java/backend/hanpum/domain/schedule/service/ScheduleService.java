package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;

import java.util.List;

public interface ScheduleService {

    List<ScheduleResDto> getMyScheduleList(Long memberId);

    // 진행, 정지
    void runAndStopSchedule(Long scheduleId);
}
