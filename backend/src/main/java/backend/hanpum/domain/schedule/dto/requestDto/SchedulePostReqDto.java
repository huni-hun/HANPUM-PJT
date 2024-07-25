package backend.hanpum.domain.schedule.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SchedulePostReqDto {
    private Long memberId;
    private Long courseId;
    private String startDate;
}
