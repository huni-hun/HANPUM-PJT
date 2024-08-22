package backend.hanpum.domain.schedule.dto.responseDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NearByAttractionResDto {
    String title;
    String address;
    String tel;
    String image1;
    double lat;
    double lon;
}
