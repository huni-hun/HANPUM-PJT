package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDayResDto {
    Long scheduleDayId;
    String date;
    boolean visit;
    boolean running;
    String totalDistance;
    String totalDuration;
    String totalCalories;
    @Setter
    List<ScheduleWayPointResDto> scheduleWayPointList;
    @Setter
    List<AttractionResDto> attractionList;

    public ScheduleDayResDto(Long scheduleDayId,
                             String date,
                             boolean visit,
                             boolean running,
                             String totalDistance,
                             String totalDuration,
                             String totalCalories) {
        this.scheduleDayId = scheduleDayId;
        this.date = date;
        this.visit = visit;
        this.running = running;
        this.totalDistance = totalDistance;
        this.totalDuration = totalDuration;
        this.totalCalories = totalCalories;
    }

}


