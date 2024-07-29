package backend.hanpum.domain.schedule.dto.requestDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleRunReqDto {
    private Long scheduleId;
    private Long memberId;
}
