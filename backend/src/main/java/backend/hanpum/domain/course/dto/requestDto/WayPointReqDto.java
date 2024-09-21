package backend.hanpum.domain.course.dto.requestDto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WayPointReqDto {
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
