package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResDto {
    Long scheduleId;
    String backgroundImg;
    String title;
    String type;
    String startPoint;
    String endPoint;
    String startDate;
    String endDate;
    int state;

}
