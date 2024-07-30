package backend.hanpum.domain.schedule.controller;

import backend.hanpum.domain.schedule.dto.requestDto.SchedulePostReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleRunReqDto;
import backend.hanpum.domain.schedule.dto.requestDto.ScheduleStartReqDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleDayResDto;
import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.service.ScheduleService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Schedule 컨트롤러", description = "Schedule Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ApiResponse response;
    private final ScheduleService scheduleService;

    @Operation(summary = "개인 일정 생성", description = "개인 일정 생성")
    @PostMapping
    public ResponseEntity<?> createSchedule(SchedulePostReqDto schedulePostReqDto) {
        Long scheduleId = scheduleService.createSchedule(schedulePostReqDto);
        return response.success(ResponseCode.SCHEDULE_CREATED, scheduleId);
    }

    @Operation(summary = "멤버별 일정 조회", description = "멤버별 일정 조회")
    @GetMapping
    public ResponseEntity<?> getMySchedule(Long memberId) {
        List<ScheduleResDto> scheduleResDto = scheduleService.getMyScheduleList(memberId);  // 추후 memberId를 직접 받지 않고 토큰 정보로 받게 수정

        return response.success(ResponseCode.SCHEDULE_LIST_FETCHED, scheduleResDto);
    }

    @Operation(summary = "일차별 일정 조회", description = "일차별 일정 조회")
    @GetMapping("/day/{dayNumber}")
    public ResponseEntity<?> getMyScheduleDay(@RequestParam Long scheduleId,
                                              @PathVariable(name = "dayNumber") int day) {
        ScheduleDayResDto result = scheduleService.getMyScheduleDay(scheduleId, day);
        return response.success(ResponseCode.SCHEDULE_DAY_FETCHED, result);
    }

    @Operation(summary = "전체 일정 시작, 종료", description = "정해진 날짜가 되면 전체 일정 시작용, 시작상태에서 사용하면 종료")
    @PostMapping("/start")
    public ResponseEntity<?> startAndStopSchedule(ScheduleStartReqDto scheduleRunReqDto) {
        Long scheduleId = scheduleService.startAndStopSchedule(scheduleRunReqDto);
        return response.success(ResponseCode.SCHEDULE_STATE_CHANGED, scheduleId);
    }

    @Operation(summary = "일차별 일정 상태 전환", description = "쉴때, 걸을때 구분할 수 있는 트리거")
    @PostMapping("/run")
    public ResponseEntity<?> runAndStop(@RequestBody ScheduleRunReqDto scheduleRunReqDto){
        scheduleService.runAndStop(scheduleRunReqDto);
        return response.success(ResponseCode.SCHEDULE_RUN_STATE_CHANGED);
    }
}
