package backend.hanpum.domain.course.dto.requestDto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchWaypointReqDto {
    @NotNull
    private String keyword;
}
