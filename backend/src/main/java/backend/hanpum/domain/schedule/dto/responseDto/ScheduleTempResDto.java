package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleTempResDto {
    Long scheduleId;
    String startPoint;
    String endPoint;
    String startDate;
    String endDate;
    Double totalDistance;
}
