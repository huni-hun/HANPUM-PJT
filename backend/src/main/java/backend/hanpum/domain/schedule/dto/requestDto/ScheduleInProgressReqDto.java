package backend.hanpum.domain.schedule.dto.requestDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScheduleInProgressReqDto {
    Long memberId;
    String date;
    double lat;
    double lon;
}
