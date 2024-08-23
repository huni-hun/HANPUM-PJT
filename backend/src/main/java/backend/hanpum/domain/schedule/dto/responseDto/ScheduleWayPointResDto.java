package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleWayPointResDto {
    Long ScheduleWayPointId;
    String name;
    String type;
    String address;
    double lat;
    double lon;
    boolean visit;
}
