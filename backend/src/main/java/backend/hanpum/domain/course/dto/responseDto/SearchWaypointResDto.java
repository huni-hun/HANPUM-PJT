package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchWaypointResDto {
    private String placeName;
    private String address;
    private Double lat;
    private Double lon;
    private String phone;
}
