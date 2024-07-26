package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WayPointResDto {
    private Long waypointId;
    private String type;
    private String name;
    private String address;
    private Float lat;
    private Float lon;
    private String pointNumber;
    private String distance;
    private String duration;
    private String calorie;
}
