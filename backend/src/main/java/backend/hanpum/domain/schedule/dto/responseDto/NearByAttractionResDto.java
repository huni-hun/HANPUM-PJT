package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NearByAttractionResDto {
    String name;
    String address;
    String tel;
    String img;
    double lat;
    double lon;
}
