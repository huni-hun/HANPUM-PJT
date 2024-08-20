package backend.hanpum.domain.course.dto.requestDto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchAttractionReqDto {
    @NotNull
    private String keyword;

    @Builder.Default
    private Integer contentTypeId = 12;
}
