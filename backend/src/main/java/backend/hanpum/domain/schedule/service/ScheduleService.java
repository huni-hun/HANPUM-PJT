package backend.hanpum.domain.schedule.service;

import backend.hanpum.domain.schedule.dto.requestDto.*;
import backend.hanpum.domain.schedule.dto.responseDto.*;

import java.util.List;

public interface ScheduleService {

    // 개인 일정 생성하기
    Long createSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto);

    // 모임 일정 생성하기
    Long createGroupSchedule(Long memberId, SchedulePostReqDto schedulePostReqDto);

    // 개인 일정 가져오기
    List<ScheduleResDto> getMyScheduleList(Long memberId);

    // 모임 일정 가져오기
    GroupScheduleResDto getGroupScheduleList(Long memberId);

    // 일정 상세 조회
    ScheduleDetailResDto getScheduleDetail(Long memberId, Long scheduleId);

    // 일차별 일정 조회
    ScheduleDayResDto getMyScheduleDay(Long memberId, Long ScheduleId, int day);

    // 일정 삭제
    void deleteSchedule(Long memberId, Long ScheduleId);

    // 전체 일정 시작, 종료
    Long startSchedule(Long memberId, ScheduleStartReqDto scheduleRunReqDto);

    // 걷기, 정지 상태 전환
    Long runAndStop(Long memberId, ScheduleRunReqDto scheduleRunReqDto);

    // WayPoint 메모 작성
    void createMemo(Long memberId, MemoPostReqDto memoPostReqDto);

    // 일정 활성화
    void activateSchedules();

    // 진행중인 일정 표시
    ScheduleInProgressResDto getRunningSchedule(Long memberId);

    // 경유지 도착
    Long setArriveScheduleWayPoint(ScheduleWayPointReqDto scheduleWayPointReqDto);

    // 일정 날짜 수정
    Long updateScheduleDate(Long memberId, ScheduleUpdateReqDto scheduleUpdateReqDto);

    // 주변 관광지 정보 가져오기
    List<NearByAttractionResDto> getNearByAttractionList(double lat, double lon);
}
