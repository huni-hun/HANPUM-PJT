package backend.hanpum.domain.group.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupResDto {

    private String title;
    private String groupImg;
    private Long recruitedCount;
    private int recruitmentCount;
}