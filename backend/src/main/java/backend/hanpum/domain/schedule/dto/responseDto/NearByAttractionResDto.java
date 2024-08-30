package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NearByAttractionResDto {
    String title;
    String address;
    String tel;
    String image1;
    double lat;
    double lon;
}
