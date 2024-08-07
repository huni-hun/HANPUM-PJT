package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;

import java.util.List;

public interface ScheduleService {

    // 개인 일정 생성하기
    Long createSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto);

    // 개인 일정 가져오기
    List<ScheduleResDto> getMyScheduleList(Long memberId);

    // 일차별 일정 조회
    ScheduleDayResDto getMyScheduleDay(Long ScheduleId, int day);

    // 일정 삭제
    void deleteSchedule(Long ScheduleId);

    // 모임 일정 생성하기

    // 모임 일정 가져오기

    // 전체 일정 시작, 종료
    Long startAndStopSchedule(ScheduleStartReqDto scheduleRunReqDto);

    // 걷기, 정지 상태 전환
    Long runAndStop(ScheduleRunReqDto scheduleRunReqDto);
}
