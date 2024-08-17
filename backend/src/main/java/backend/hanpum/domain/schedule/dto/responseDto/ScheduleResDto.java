package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResDto {
    Long scheduleId;
    String title;
    String type;
    String date;
    boolean state;

}
