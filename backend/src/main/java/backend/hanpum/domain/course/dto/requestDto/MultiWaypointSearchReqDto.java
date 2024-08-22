package backend.hanpum.domain.course.dto.requestDto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultiWaypointSearchReqDto {
    private String name;
    private Double x;
    private Double y;
}
