package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.Getter;

@Getter
public class ScheduleTempResDto {
    Long scheduleId;
    String startPoint;
    String endPoint;
    String startDate;
    String endDate;
    String totalDistance;
}
