package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;

import java.util.List;

public interface ScheduleService {

    // 개인 일정 생성하기
    Long createSchedule(SchedulePostReqDto schedulePostReqDto);


    // 개인 일정 가져오기
    List<ScheduleResDto> getMyScheduleList(Long memberId);

    // 모임 일정 생성하기


    // 모임 일정 가져오기

    // 진행, 정지
    void runAndStopSchedule(Long scheduleId);
}
