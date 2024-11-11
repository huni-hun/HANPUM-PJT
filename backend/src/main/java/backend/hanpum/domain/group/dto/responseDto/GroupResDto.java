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

    private Long groupId;
    private String title;
    private String groupImg;
    private int likeCount;
    private Long recruitedCount;
    private int recruitmentCount;
    private String startPoint;
    private String endPoint;
    private Double totalDistance;
    private Integer totalDays;
    private String startDate;
    private String endDate;
    private boolean isLike;
}