package backend.hanpum.domain.course.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttractionResDto {
    Long attractionId;
    String name;
    String type;
    String address;
    Double lat;
    Double lon;
    String img;
}
