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
    private Float lat;
    private Float lon;
    private String phone;
}
