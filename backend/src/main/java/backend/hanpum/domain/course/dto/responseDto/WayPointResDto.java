package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WayPointResDto {
    private Long waypointId;
    private String type;
    private String name;
    private String address;
    private Double lat;
    private Double lon;
    private String pointNumber;
    private String distance;
    private String duration;
    private String calorie;
    private List<Double> vertexes;
}
