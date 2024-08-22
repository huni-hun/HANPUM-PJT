package backend.hanpum.domain.schedule.dto.responseDto;

import backend.hanpum.domain.course.dto.responseDto.AttractionResDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDayResDto {
    Long ScheduleDayId;
    String date;
    boolean visit;
    boolean running;
    String totalDistance;
    String totalDuration;
    String totalCalories;
    List<ScheduleWayPointResDto> scheduleWayPointList;
    List<AttractionResDto> attractionList;
}
