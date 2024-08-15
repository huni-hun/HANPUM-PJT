package backend.hanpum.domain.course.dto.requestDto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDayReqDto {
    private Integer dayNumber;
    List<WayPointReqDto> wayPointReqDtoList;
    List<AttractionReqDto> attractionReqDtoList;
}
