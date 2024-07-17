package backend.hanpum.domain.schedule.controller;

import backend.hanpum.domain.schedule.dto.responseDto.ScheduleResDto;
import backend.hanpum.domain.schedule.service.ScheduleService;
import backend.hanpum.exception.format.code.ApiResponse;
import backend.hanpum.exception.format.response.ResponseCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Schedule 컨트롤러", description = "Schedule Controller API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ApiResponse response;
    private final ScheduleService scheduleService;

    @Operation(summary = "멤버별 일정 조회", description = "멤버별 일정 조회")
    @GetMapping
    public ResponseEntity<?> getMySchedule(Long memberId) {
        List<ScheduleResDto> scheduleResDto = scheduleService.getMyScheduleList(memberId);  // 추후 memberId를 직접 받지 않고 토큰 정보로 받게 수정

        return response.success(ResponseCode.SCHEDULE_LIST_FETCHED, scheduleResDto);
    }
}
