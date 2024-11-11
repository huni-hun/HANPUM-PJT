package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDayResDto {
    Integer dayNumber;
    Double  total_distance;
    String total_duration;
    String total_calorie;
}
