package backend.hanpum.domain.course.dto.requestDto;

import backend.hanpum.domain.course.entity.CourseDay;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttractionReqDto {
    private String name;
    private String type;
    private String address;
    private Double lat;
    private Double lon;
    private String image;
}
